import request from "."

export const getComment = (pid: string) => {
    return request.get(`/api/comments?pid=${pid}`)
}

interface Comment {
    pid: string
    fid: string
    content: string
    name: string
    email: string
    site: string
}
export const newComment = (c: Comment) => {
    return request.post("/api/comment", {
        pid: c.pid,
        fid: c.fid,
        content: c.content,
        name: c.name,
        email: c.email,
        site: c.site
    })
}