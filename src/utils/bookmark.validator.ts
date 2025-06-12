import { z, string } from "zod"
import { parseOrThrow } from "./validator";

const Bookmark = z.object({
    title: string({ message: "title : wrong type or undefind" }).min(1, "Require"),
    url: string({ message: "url : wrong type or undefind" }).min(1, "Require"),
    description: string({ message: "description : wrong type or undefind" }).min(1, "Require"),
    tags: z.array(z.string()).min(1, "Must have at least one item")
})

export const validateCreateBookmark = (data: unknown) => parseOrThrow(Bookmark.safeParse(data))

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

    return parseOrThrow(dynamicSchema.safeParse(data));
};