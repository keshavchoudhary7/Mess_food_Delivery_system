import Mess from "../models/messSchema.js";
// Create a new Mess

export const addMessMenu = async (req, res) => {
  try {
    if (req.user.role !== "mess_owner") {
      return res.status(403).json({
        message: "Access denied. You are not authorized to add menus.",
        status: false,
      });
    }

    const { name, phone, address, weeklyMenu, monthlyPrice } = req.body;
    if (!name || !phone || !address || !weeklyMenu) {
      return res.status(400).json({
        message: "All fields are required.",
        status: false,
      });
    }

    // check if duplicate mess exists
    const existingMess = await Mess.findOne({ name, owner: req.user.userId });
    if (existingMess) {
      return res.status(400).json({
        message: "Mess with this name already exists for this owner.",
        status: false,
      });
    }

    const newMess = new Mess({
      owner: req.user.userId,
      name,
      phone,
      address,
      weeklyMenu,
      monthlyPrice,
    });
    console.log("req.user:", req.user.userId);
    await newMess.save();
    res.status(201).json({
      message: "Mess menu added successfully",
      mess: newMess,
      status: true,
    });
  } catch (error) {
    console.error("Error adding mess menu:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      status: false,
    });
  }
};

// Get all Messes
export const getAllMesses = async (req, res) => {
  try {
    const messes = await Mess.find().populate("owner", "name email");
    if (!messes || messes.length === 0) {
      return res.status(404).json({ error: "No messes found" });
    }

    res.json(messes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Mess by ID
export const getMessById = async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!mess) return res.status(404).json({ error: "Mess not found" });
    res.json(mess);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Mess
export const updateMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mess) return res.status(404).json({ error: "Mess not found" });
    res.json(mess);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Mess
export const deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndDelete(req.params.id);
    if (!mess) return res.status(404).json({ error: "Mess not found" });
    res.json({ message: "Mess deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
