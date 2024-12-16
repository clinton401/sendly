import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { Session } from "next-auth";
import { UserModel, User } from "@/nobox/record-structures/user";
export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user }) {
      console.log(user)
      const customUser = user as User;
 
      if(!customUser || !customUser.phone) return false;
      const phone = customUser.phone;
        const existingUser = await UserModel.findOne({phone});
        if (!existingUser || existingUser.isVerified === false || !existingUser.id) return false;
      
  
      

      return true;
    },
    async jwt({ token }) {
      let user;
      if (token?.phone) {
        const phone = token.phone as string;
        user = await UserModel.findOne({phone});
      } else if (token?.sub) {
        
        user = await UserModel.findOne({id: token.sub});
      }
      console.log({jwt: user})
      if (user) {
          token.phone = user.phone
          token.sub = user.id;
          token.name = user.name;
          token.isVerified = user.isVerified;
          token.address = user.address;
      }

      return token;
    },
    async session({ token, session }: { session: Session; token: any }) {
        if (!token || !session?.user) return session;

        if(token.phone) {
          session.user.phone = token.phone
        }
        if(token.name) {
          session.user.name = token.name
        }
        if(token.address) {
          session.user.address = token.address
        }
        if (token.sub) {
          session.user.id = token.sub;
        }
       
       
   
        if (token.isVerified) {
          session.user.isVerified = token.isVerified;
        }
   
   
     
  
      
        return session;
      },
  },
  ...authConfig,
});
