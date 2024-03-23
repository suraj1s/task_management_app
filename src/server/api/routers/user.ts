import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const GetUserByEmailInput = z.object({
  email: z.string().email(),
});

export const userRouter = createTRPCRouter({
  getUserByEmail : publicProcedure.input(GetUserByEmailInput).query(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({
        where : {
            email : input.email
        }
    })
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),

});

