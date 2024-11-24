/* eslint-disable @typescript-eslint/no-explicit-any */

import GoogleProvider from "next-auth/providers/google";
import { db } from "../db/db";
import { users } from "../db/schema";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,


      
      async profile(profile, token: any) {
        console.log("profile", profile);
        console.log("tokens", token);

        const data = {
          // id: Number(profile.sub),
          fname: profile.given_name,
          lname: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          externalId: profile.sub,
          image: profile.picture,
        };
        
        console.log('data', data)
        try {
          const user = await db
            .insert(users)
            .values(data)
            .onConflictDoUpdate({ target: users.email, set: data })
            .returning();
            console.log('user', user)
          return {
            ...data,
            name: data.fname,
            id: String(user[0].id),
            role: user[0].role,
          };

        } catch (err) {
          console.log(err);
          return {
            id: "",
          };
        }
      },
    }),
  ],

  callbacks: {
    session(data: any) {
      return data
    },
    
    jwt({ token, user }: { token: any; user: any }) {
     if (user) {
       token.id = user.id;
       token.role = user.role;
      }
      return token;
    }
   }
};
