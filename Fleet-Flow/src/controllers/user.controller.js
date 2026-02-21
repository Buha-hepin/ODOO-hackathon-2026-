import { asyncHandler } from "../utils/asynchandler.js";
import bcrypt from "bcrypt";
import { apierror } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";  

const ispasswordcorrect = async (enteredpassword, userpassword) => {
    return await bcrypt.compare(enteredpassword, userpassword);
}   

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log("Register request body:", req.body);

    if (!username || !email || !password || !role) {
        throw new apierror(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new apierror(409, "User with email or username already exists");
    }


    const user = await User.create({
        username,
        email,
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new apiResponse(201, createdUser, "User registered successfully")
    );
});


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    

    if (!email || !password) {
        console.log("Email or password missing");
        throw new apierror(400, "Email and password are required");
    }

    console.log("Finding user with email:", email);
    const user = await User.findOne({ email });
   

    if (!user) {
        console.log("User not found");
        throw new apierror(401, "Invalid email or password");
    }

    console.log("User found, checking password");
    const isPasswordValid = await ispasswordcorrect(password, user.password);

    if (!isPasswordValid) {
        console.log("Password incorrect");
        throw new apierror(401, "Invalid email or password");
    }

    console.log("Login successful for user:", email);
    const loggedInUser = await User.findById(user._id).select("-password");
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(200, {
                user: loggedInUser,
                role: user.role,
                accessToken: accessToken
            }, "User logged in successfully")
        );
});
