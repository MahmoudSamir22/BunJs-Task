import { Elysia, t } from 'elysia'

export const authModel = new Elysia()
    .model({
        signup: t.Object({
            name: t.String({
                error: "Name is required and must be a string",
            }),
            email: t.String({
                format: "email",
                error: "Please enter a valid email address",
            }),
            password: t.String({
                error: "Password is required and must be a string",
            })
        }),
        signin: t.Object({
            email: t.String({
                format: "email",
                error: "Please enter a valid email address",
            }),
            password: t.String({
                error: "Password is required and must be a string",
            })
        })
    })