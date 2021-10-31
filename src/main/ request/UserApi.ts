import {doRequest, HttpMethodType} from "./Request";
import {UserAuthRequest, UserRegRequest} from "../types/User";

export const AuthUser = async (usernameOrEmail: string, password: string) => {
    let data: UserAuthRequest = {
        usernameOrEmail: usernameOrEmail,
        password: password
    }
    return await doRequest(
        "user/in",
        HttpMethodType.POST,
        JSON.stringify(data),
        {"Content-Type": "application/json; charset=utf-8"}
    )
}

export const GetUser = async () => {
    return await doRequest("user/", HttpMethodType.GET)
}

export const MailTasks = async () => {
    return await doRequest("task/mail", HttpMethodType.GET)
}

export const RegUser = async (email: string, username: string, password: string) => {
    let data: UserRegRequest = {
        email: email,
        username: username,
        password: password
    }
    return await doRequest(
        "user/",
        HttpMethodType.POST,
        JSON.stringify(data),
        {"Content-Type": "application/json"}
    )
}

export const SignOutUser = async () => {
    return await doRequest("user/out", HttpMethodType.GET,)
}