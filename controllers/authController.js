import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password (The "Smoothie" step)
    // 10 is the "salt rounds" (how hard the blender works). 
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the user with the HASHED password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async(req,res) =>{

 try {
   const {email,password} = req.body
   const user = await User.findOne({email})
 
   if(!user) 
     return res.status(404).json({message:"User not Found"})
 
 const originalPassword=user.password
 const isMatch = await bcrypt.compare(password,originalPassword)
  
 if(!isMatch)
   return res.status(404).json({message:"Invalid Password"})
 
  
   const token=jwt.sign(
     {id:user._id},
     process.env.JWT_SECRET,
     {expiresIn:'1h'}
   )
  return res.status(200).json({token})
 } catch (error) {
  res.status(500).json({message:"Error logging in",error})
 }
}