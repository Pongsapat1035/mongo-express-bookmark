import { z } from "zod";
import { AppError } from "./errors/appError";

export const isEmpty = (obj: Object) => {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
}

export const parseOrThrow = <T>(result: z.SafeParseReturnType<any, T>) => {
    if (!result.success) {
        const message = result.error.issues[0].message
        throw new AppError(message)
    }
    return result.data
}