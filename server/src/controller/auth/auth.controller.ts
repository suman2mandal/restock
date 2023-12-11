import { NextFunction, Request, Response } from 'express';
import User from '../../model/user/user.model.js';
import { IUser } from '../../types/user/user.js';
import catchAsyncError from '../../middleware/catchAsyncError.js';

/* CREATE USER */

export const createUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name, role, addresses, orders }: IUser = req.body;

        // Check if required fields are present
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            email,
            password,
            name,
            role,
            addresses,
            orders
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

/* LOGIN USER */
export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: IUser = req.body;

        // Check if required fields are present
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password === password) {
            // Passwords match
            res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        } else {
            // Passwords don't match
            res.status(400).json({ message: 'Wrong credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});
