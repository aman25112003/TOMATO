import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";

//LOGIN USER
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        //check if the user exists or not in the DB
        const user = await userModel.findOne({email});

        //if user does not exists in the DB
        if(!user){
            return res.json({
                success:false,
                message:"User does not exists"
            })
        }

        //user exists

        //match the user password entered and the stored password in the DB
        const isMatch = await bycrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({
                success:false,
                message:"Password is incorrect"
            })
        }

        //password is matching

        //generate the token
        const token = createToken(user._id);

        res.json({
            success:true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error in login userController"
        })
    }
}


//FUNCTION FOR CREATING TOKEN:
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


//REGISTER USER
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try{
        //check if the user already exists in DB
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter a valid email address"
            })
        }

        //email is valid
        if(password.length<8){
            return res.json({
                success:false,
                message:"Please Enter a strong password"
            })
        }

        //email and password both valid
        //encrypt the password so that nobody can see the password
        //in the database of the user not even the admin{app developer}
        // encrypting is also called hashing
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);


        //everything is fine now create an entry for the new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        //create token
        const token = createToken(user._id);
        res.json({
            success:true,
            token
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error in register userController"
        })
    }
}

export {loginUser,registerUser};

