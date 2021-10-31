import React from "react";
import {User} from "../types/User";

type UserContextType = {
    user: User | null
    logoutUser(): void,
    loginUser(usernameOrEmail: string, password: string): void
}

let defaultUserContext: UserContextType = {
    user: null,
    logoutUser: async () => {
        console.error(`Logout user not implemented!`)
    },
    loginUser: async (usernameOrEmail: string, password: string) => {
        console.error(`Login user not implemented!`)
    }
}
const UserContext = React.createContext(defaultUserContext)
UserContext.displayName = 'UserContext';

export default UserContext