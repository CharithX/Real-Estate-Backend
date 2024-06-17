import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "failed to get users" });
  }
};


export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const getUserById = await prisma.user.findUnique({
      where: { id: id },
    });
    res.status(200).json(getUserById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get a user" });
  }
};


export const updateUserById = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};
export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ mesage: "Not Authorized" });
  }
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "succesfully to deleted user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete user" });
  }
};
