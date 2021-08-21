import request from "."

export const getTag =()=> {
    return request.get("/api/tags")
}

export const getAdminTag =()=> {
    return request.get("/api/admin/tags")
}