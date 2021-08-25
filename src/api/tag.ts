import request from "."

export const getTag = () => {
    return request.get("/api/tags")
}

export const getAdminTag = () => {
    return request.get("/api/admin/tags")
}

export const getPostByTag = (id: string) => {
    return request.get("/api/tag/" + id)
}