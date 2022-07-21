import { User } from "../models/user.model.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { envConfig } from "../config/envConfig.js";
import { transporter } from "../config/mailer.js";
import { handleHttpError } from "../handlers/handleHttpError.js";

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

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"DISNEY CHALLENGE" <disneychallenge@gmail.com>', // sender address
            to: newUser.email, // list of receivers
            subject: "REGISTRO EN DISNEY PAGE", // Subject line
            text: "Gracias por registrarte! te damos la bievenida a nuestra pagina", // plain text body
           
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.json(newUser)
    } catch (error) {
        handleHttpError(error, res)
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
        }, envConfig.jwt.secret)

       res.json({
           message: 'Login successfully',
           user: user.email,
           token: token})
    } catch (error) {
        handleHttpError(error, res)
    }
}