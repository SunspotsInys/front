import request from "."

export const getTag =()=> {
    return request.get("/api/tags")
}