import { z } from 'zod'

const BaseAuth = z.object({
    email: z.string({ message: "invalid type or undefine" }).min(1, "Require").email("email is incorect format"),
    password: z.string({ message: "invalid type or undefine" }).min(1, "Require").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, "password is incorrect format"),
})

const Register = BaseAuth.extend({
    name: z.string({ message: "invalid type or undefine" }).min(1, "Require")
})


export const validateRegister = (data: any) => Register.parse(data)

export const validateLogin = (data: any) => BaseAuth.parse(data)
