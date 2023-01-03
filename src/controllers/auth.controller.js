import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const singUp = async (req, res) => {
  console.log("data: ", req.body);
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.role = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.role = [role._id];
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 3600,
    });

    res.json({
      user:{
        username:savedUser.username,
        email:savedUser.email,
        roles: savedUser.role
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      auth: false,
      message: "An Error Unexpected, try again",
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email }).populate("role");

  if (!userFound) return res.status(400).json({ message: "user not found" });

  const mathPassword = await User.comparePassword(password, userFound.password);

  if (!mathPassword)
    return res.status(401).json({ token: null, message: "invalid password" });

  const token = await jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 3600,
  });

  res.json({
    user:{
      username:userFound.username,
      email:userFound.email,
      roles:userFound.role
    },
    token,
  });
};
