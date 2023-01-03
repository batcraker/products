import User from "../models/User";
import { ROLES } from "../models/Role";

export const checkExistingUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const userFound = await User.findOne({ username });
    console.log(userFound);
    const emailFound = await User.findOne({ email });

    if (userFound) {
      res.status(400).json({ message: "user exist" });
      return
    }
    if (emailFound) {
      res.status(400).json({ message: "email exist" });
      return
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkExistingRoles = (req, res, next) => {
  try {
    const { roles } = req.body;
    if (!roles ) {
      return res.status(400).json({ message: "roles is required" });
    }

    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res.status(400).json({ message: `Role ${roles[i]} doesn't exist` });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
