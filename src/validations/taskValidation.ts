import { Elysia, t } from 'elysia'

export const taskModel = new Elysia()
    .model({
        createTask: t.Object({
            title: t.String({
                error: "Title is required and must be a string",
            }),
            description: t.Optional(t.String({
                error: "Description must be a string",
            }))
        }),
        updateTask: t.Object({
            title: t.Optional(t.String({
                error: "Title must be a string",
            })),
            description: t.Optional(t.String({
                error: "Description must be a string",
            })),
        })
    })