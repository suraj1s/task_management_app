import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      const createdById = ctx.session.user.id;
      const existingCategory = await ctx.db.category.findFirst({
        where: { name: input.category }, // Use input.category for consistency
      });
      if (!existingCategory) {
        throw new Error("Category not found");
      }
        // console.log(existingCategory , "this is the existing category")
      const createdTask = await ctx.db.task.create({
        data: {
          title: input.title,
          createdById: createdById,
          categoryId : existingCategory.id,
        },
      });
      return createdTask;
    }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedTask = await ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
      return updatedTask;
      // return ctx.db.task.findMany({
      //   where: {
      //     createdById: ctx.session.user.id
      //     },
      //   })
    }),

  deleteOne: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedTask = await ctx.db.task.delete({
        where: {
          id: input,
        },
      });
      return deletedTask;
      // return ctx.db.task.findMany({
      //   where : {
      //     createdById: ctx.session.user.id
      //   },
      //   });
    }),
  
  getAllTasks: protectedProcedure
  .input(z.string())
  .query( async ({ ctx , input  }) => {

    const createdTask = await ctx.db.task.findMany({
      where : {
        createdById: ctx.session.user.id,
        category : {
          name : input
        }
      },
      });
      return createdTask;
  }),
});
