import { Space } from "nobox-client";
import { createRowSchema } from "../config";

export interface User {
    name: string;
    phone: string;
    password: string;
    isVerified: boolean;
    address?: string | undefined;

}

export const UserStructure: Space<User> = {
    space: "User",
    description: "A Record Space for Users",
    structure: {
        name: {
            description: "User's Name",
            type: String,
            required: true
        },
        password: {
            description: "User's Password",
            required: true,
            type: String,
            // hashed: true
        },
        phone: {
            description: "User's Phone Number",
            required: true,
            type: String,
        },
        isVerified: {
            description: "User's verified status",
            required: false,
            type: Boolean,
            defaultValue: false
        },
        address: {
            description: "User's Age",
            required: false,
            type: String,
        }
    }
}

export const UserModel = createRowSchema<User>(UserStructure);