import { z } from 'zod'
import { parseOrThrow } from './validator'

const LoginForm = z.object({
    email: z.string({ message: "invalid type or undefine" }).min(1, "Require").email("email is incorect format"),
    password: z.string({ message: "invalid type or undefine" }).min(1, "Require").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, "password is incorrect format"),
})

const RegisterForm = LoginForm.extend({
    name: z.string({ message: "name is invalid type or undefine" }).min(1, "Require")
})

export const validateRegister = (data: unknown) => parseOrThrow(RegisterForm.safeParse(data))

export const validateLogin = (data: unknown) => parseOrThrow(LoginForm.safeParse(data))