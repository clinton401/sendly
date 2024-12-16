import type { NextAuthConfig } from "next-auth";
import {LoginSchema} from "@/schemas";
import {validatePassword} from "@/lib/password-utils";
import Credentials from "next-auth/providers/credentials";
import { UserModel } from "@/nobox/record-structures/user";
export default {
  providers: [

    Credentials({ 
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.error("Invalid input fields:", validatedFields.error);
          return null;
        }
      
        const { phone, password } = validatedFields.data;
        const user = await UserModel.findOne({phone});
        if (!user) {
          console.error("User not found ");
          return null;
        }
        const isValid = await validatePassword(password, user.password);
        if (!isValid) {
          console.error("Invalid password");
          return null;
        }
      
        return user;
      }
      
    }),
  ],
} satisfies NextAuthConfig;
