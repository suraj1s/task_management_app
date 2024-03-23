import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
// why am i getting useMutaion in create task but not in updateOne and deleteOne
  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const createdById = ctx.session.user.id;
      const createdTask = await ctx.db.task.create({
        data: {
          title: input.title,
          createdById: createdById,
          // completed: false,
        },
      });
      return createdTask;
    }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      const updatedTask = await ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
      console.log(updatedTask)
      return ctx.db.task.findMany({
        where: {
          createdById: ctx.session.user.id
          },
        })
    }),

  deleteOne: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const deletedTask = await ctx.db.task.delete({
        where: {
          id: input,
        },
      });
      console.log(deletedTask)
      return ctx.db.task.findMany({
        where : {
          createdById: ctx.session.user.id
        },
        }); ;
    }),
    // client side code
    // const deleteTask = api.task.deleteOne.useMutation({});

    // const createTask = api.task.createTask.useMutation({
    //   onSuccess: () => {
    //     router.refresh();
    //     setName("");
    //   },
    // });
  
  getAllTodos: protectedProcedure.query( async ({ ctx }) => {

    const createdTask = await ctx.db.task.findMany({
      where : {
        createdById: ctx.session.user.id
      },
      });
      return createdTask;
  }),
});
