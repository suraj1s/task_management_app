import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createdById = ctx.session.user.id;
      const createdCategory = await ctx.db.category.create({
        data: {
          name: input.name,
          createdById: createdById,
        },
      });
      return createdCategory;
    }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedCategory = await ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
      return updatedCategory;
    }),

  deleteOne: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const deletedCategory = await ctx.db.category.delete({
        where: {
          id: input,
        },
      });
      return deletedCategory;
    }),

  getAllCategorys: protectedProcedure.query(async ({ ctx }) => {
    const createdCategory = await ctx.db.category.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });
    return createdCategory;
  }),
});
