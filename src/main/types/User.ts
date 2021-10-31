type User = {
    id: string | null
    username: string | null
}

type UserAuthRequest = {
    usernameOrEmail: string,
    password: string
}

type UserRegRequest = {
    username: string,
    email: string,
    password: string
}

export type {User, UserRegRequest, UserAuthRequest}

