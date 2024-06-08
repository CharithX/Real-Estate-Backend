import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    //hash the password

    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedpassword,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: "User created Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User created Failed" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if user exist
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    //check if password correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    //generate cookie token and send to user
    // res.setHeader("set-Cookie", "test=" + "myValue").json({ message: "succesfully logged in" })
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_TOKEN,
      {expiresIn: age}
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "login succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "login failed" });
  }
};

export const logout = (req, res) => {

res.clearCookie("token").status(200).json({message: "logout succeslly"})

};
