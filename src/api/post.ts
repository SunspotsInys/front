import request from "."


interface Tag {
    id: string
    name: string
}

interface FormState {
    title: string
    public: boolean
    top: boolean
    tags: Tag[]
    content: string
}

export const getPostTot = () => {
    return request.get("/api/postTot")
}

export const getPosts = (page: number = 1) => {
    return request.get(`/api/posts?page=${page}&len=20`)
}

export const getPost = (pid: string) => {
    return request.get("/api/post?pid=" + pid)
}

export const adminGetPostList = (page: number) => {
    return request.get(`/api/admin/post?page=${page}&len=10`)
}


export const newPost = (post: FormState) => {
    return request.post("/api/admin/post", {
        title: post.title,
        public: post.public,
        top: post.top,
        tags: post.tags,
        content: post.content
    })
}

export const getAchieve = () => {
    return request.get("/api/achieve")
}