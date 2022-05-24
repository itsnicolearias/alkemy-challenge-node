import { User } from "../models/user.model.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { enviromentConfig } from "../config/environmentConfig.js";

export const register = async(req, res) => {
    const {name, age, email, password } = req.body;

    try {
        //check if email already exist
        const emailExist = await User.findOne({
            where: {
                email: email
            }
        })
        if (emailExist) {
           res.send("User already exists");
        }

        //hash password
        const salts = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salts)

        const newUser = await User.create({
            name: name,
            age: age,
            email: email,
            password: hashedPassword
        })
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res) => {

    const { email, password } = req.body

    try {
        //check if the user exist in the database
        const user = await User.findOne({ 
            where: {
                email: email
            }
         })
        if(!user)  {
            res.send("User does not exists");
        } 

         //compare password
         const validPass = await bcrypt.compare(password, user.password)
         if (!validPass) {
             res.send("Invalid credentials");
         }

         //JWT
         const token = JWT.sign({
            name: user.name,
            id: user.id
        }, enviromentConfig.jwt.secret)

       res.json({
           message: 'Login successfully',
           user: user.email,
           token: token})
    } catch (error) {
        console.log(error)
    }
}