import { string, z } from 'zod'

const BaseAuth = z.object({
    email: z.string({ message: "invalid type or undefine" }).min(1, "Require").email("email is incorect format"),
    password: z.string({ message: "invalid type or undefine" }).min(1, "Require").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, "password is incorrect format"),
})

const Register = BaseAuth.extend({
    name: z.string({ message: "invalid type or undefine" }).min(1, "Require")
})

const Bookmark = z.object({
    title: string().min(1, "Require"),
    url: string().min(1, "Require"),
    description: string().min(1, "Require"),
    tags: z.array(z.string()).min(1, "Must have at least one item")
})

export const validateRegister = (data: any) => Register.parse(data)

export const validateLogin = (data: any) => BaseAuth.parse(data)

export const validateCreateBookmark = (data: any) => Bookmark.parse(data)

export const isEmpty = (obj: Object) => {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

export const allowedUpdateBookmarkField = (data: any) => {
    const updateSchema = Bookmark.extend({
        isPublic: z.boolean(),
    });

    const schemaMap = updateSchema.shape;

    const validKeys = Object.keys(data).filter(
        (key): key is keyof typeof schemaMap => key in schemaMap
    );

    const dynamicShape = Object.fromEntries(
        validKeys.map((k) => [k, schemaMap[k]])
    );

    const dynamicSchema = z.object(dynamicShape);
    const result = dynamicSchema.parse(data);

    return result;
};