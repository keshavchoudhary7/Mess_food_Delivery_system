import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashedPasword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPasword = await bcrypt.hash(password, salt);
  return hashedPasword;
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
