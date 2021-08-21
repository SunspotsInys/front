import axios from "axios";
import message from "ant-design-vue/lib/message";
import "ant-design-vue/lib/message/style/index.css";

import { getToken, isSignin } from "../store";
import { clearToken } from "../store";

const request = axios.create()


request.interceptors.request.use(
    config => {
        if (isSignin()) {
            config.headers["X-Token"] = getToken()
        }
        return config;
    },
    error => {
    }
)

request.interceptors.response.use(
    response => {
        switch (response.status) {
            case 200:
                break
            default:
                message.error("响应异常！！！", 5)
                break
        }
        return response.data
    },
    error => {
        switch (error.response.data.code) {
            case 4003:
                message.error("可以更新权限了！！！")
                clearToken();
                break;
            default:
                break;
        }
        return error.response.data
    }
)

export default request;
