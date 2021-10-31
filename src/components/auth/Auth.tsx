import React from "react";
import LoadableBtn from "../util/LoadableBtn";
import ValidateInput from "../util/ValidateInput";
import {NotEmptyValidate, NotEmptyValidateForall} from "../../main/utils/ValidationUtils";
import UserContext from "../../main/context/UserContext";
import {UIMessage, UIMessageType} from "../../main/types/UIMessage";
import AlertMessage from "../util/AlertMessage";

type AuthState = {
    emailOrUsername: string,
    password: string,
    loginProcessing: boolean,
    activateValidation: boolean,
    notificationMessage: UIMessage | null
}

const InputsNames = {
    emailOrUsernameInputName: 'emailOrUsername',
    passwordInputName: 'password'
}

class Auth extends React.Component<any, AuthState> {
    static contextType = UserContext;

    constructor(props: any) {
        super(props);
        this.state = {
            emailOrUsername: "",
            password: "",
            activateValidation: false,
            loginProcessing: false,
            notificationMessage: null
        }
    }

    render() {
        return <div className="tab-pane fade show active" id="auth" role="tabpanel" aria-labelledby="home-tab">
            {this.state.notificationMessage != null &&
            <AlertMessage message={this.state.notificationMessage} onClose={this.RemoveMessage}/>
            }
            <div className="my-3">
                <label htmlFor="username-or-email" className="form-label">Username or email</label>
                <ValidateInput
                    type="text"
                    className='form-control'
                    id="username-or-email"
                    name={InputsNames.emailOrUsernameInputName}
                    value={this.state.emailOrUsername}
                    activateBeforeTouch={this.state.activateValidation}
                    errorMsg={this.EmailValidateRule()}
                    onChange={this.InputChangeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <ValidateInput
                    type="password"
                    className='form-control'
                    id="password"
                    name={InputsNames.passwordInputName}
                    value={this.state.password}
                    activateBeforeTouch={this.state.activateValidation}
                    errorMsg={this.PasswordValidateRule()}
                    onChange={this.InputChangeHandler}/>
            </div>
            <LoadableBtn id="login-btn-id"
                         onClick={this.LoginBtnClickHandler}
                         loading={this.state.loginProcessing}>
                Login
            </LoadableBtn>
        </div>
    }

    LoginBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            activateValidation: true
        }, async () => {
            if (NotEmptyValidateForall([this.state.emailOrUsername, this.state.password])) {
                await this.setState({
                    loginProcessing: true
                }, async () => {
                    let {emailOrUsername, password} = this.state
                    let loginResult: UIMessage = {
                        message: "Signed in!",
                        messageType: UIMessageType.SUCCESS
                    }
                    try {
                        await this.context.loginUser(emailOrUsername, password)
                    } catch (e) {
                        loginResult = {
                            message: "Wrong username/email or password!",
                            messageType: UIMessageType.ERROR
                        }
                    } finally {
                        this.setState({
                            loginProcessing: false,
                        })
                    }
                })
            }
        })
    }

    EmailValidateRule = (): string => {
        return NotEmptyValidate(this.state.emailOrUsername) ? "" : "Username/email can't be empty!"
    }

    PasswordValidateRule = (): string => {
        return NotEmptyValidate(this.state.password) ? "" : "password can't be empty!"
    }

    InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target
        let name = target.name
        let inputValue = e.target.value
        this.setState({[name]: inputValue} as Pick<AuthState, any>)
    }
    RemoveMessage = () => {
        this.setState({
            notificationMessage: null
        })
    }
}

export default Auth