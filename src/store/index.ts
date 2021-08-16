import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex';

interface Auth {
    uname: string
    token: string
    avatar: string
}


export const key: InjectionKey<Store<Auth>> = Symbol()

const store = createStore<Auth>({
    state: {
        uname: localStorage.getItem("uname") ? localStorage.getItem("uname")! : "",
        token: localStorage.getItem("token") ? localStorage.getItem("token")! : "",
        avatar: localStorage.getItem("avatar") ? localStorage.getItem("avatar")! : ""
    },
    mutations: {
        signin(state: Auth, auth: Auth) {
            state.uname = auth.uname
            state.token = auth.token
            state.avatar = auth.avatar
            localStorage.setItem("uname", auth.uname)
            localStorage.setItem("token", auth.token)
            localStorage.setItem("avatar", auth.avatar)
        }
    }
});

export const isSignin = () => {
    return store.state.uname !== "" && store.state.token !== "" && store.state.avatar !== ""
}

export const getToken = () => {
    return store.state.token
}

export const clearToken = () => {
    localStorage.clear()
}

export default store;
