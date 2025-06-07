export const getAllowedField = (data: any) => {
    const allowedFields = ['title', 'description', 'tags', 'isPublic', 'url']
    const dataToUpdate: { [key: string]: any } = {};

    for (const key of allowedFields) {
        if (data[key]) {
            dataToUpdate[key] = data[key];
        }
    }
    return dataToUpdate
}