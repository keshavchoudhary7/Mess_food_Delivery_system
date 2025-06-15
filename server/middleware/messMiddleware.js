import Mess from "../models/messSchema.js";

// Middleware to check if the user is the owner of the Mess
export const isMessOwner = async (req, res, next) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return res.status(404).json({ error: "Mess not found" });
    if (mess.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
