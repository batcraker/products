import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no token provider" });
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "user not found" });

    next();
  } catch (error) {
    return res.status(404).json({ message: "Token invalid" });
  }
};


export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({_id: {$in: user.role}});


  for(let i = 0; i < roles.length; i++){
    if(roles[i].name==="admin"){
      next()
      return
    }
  }

  return res.status(403).json({message: "You Aren't admin"});

}