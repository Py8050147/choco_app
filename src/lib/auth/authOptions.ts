/* eslint-disable @typescript-eslint/no-explicit-any */

import GoogleProvider from "next-auth/providers/google";
import { db } from "../db/db";
import { users } from "../db/schema";
import { AuthOptions } from "next-auth";
import redis from "../db/redis";

const USER_CACHE_TTL_SECONDS = 60 * 60;

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      async profile(profile, token: any) {
        // console.log("profile", profile);
        // console.log("tokens", token);

        const data = {
          // id: Number(profile.sub),
          fname: profile.given_name,
          lname: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          externalId: profile.sub,
          image: profile.picture,
        };

        // console.log("data", data);
        try {
          const user = await db
            .insert(users)
            .values(data)
            .onConflictDoUpdate({ target: users.email, set: data })
            .returning();
          console.log("user", user);
          const result = {
            ...data,
            name: data.fname,
            id: String(user[0].id),
            role: user[0].role,
          };

          await redis.set(`user:${result.id}`, JSON.stringify(result), {
            ex: USER_CACHE_TTL_SECONDS,
          });
         return result;
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
      return data;
    },

    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
};
