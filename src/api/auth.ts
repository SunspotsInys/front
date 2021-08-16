import request from "."

export const signin = (username: string, password: string) => {
    return request.post("/api/signin", {
        username: username,
        password: password
    })
}