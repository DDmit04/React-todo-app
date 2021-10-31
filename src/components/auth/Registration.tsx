import React from "react";
import ValidateInput from "../util/ValidateInput";
import LoadableBtn from "../util/LoadableBtn";
import {
    EmailValidate,
    EqualityValidate,
    NotEmptyValidate,
    NotEmptyValidateForall
} from "../../main/utils/ValidationUtils";
import {RegUser} from "../../main/ request/UserApi";
import {UIMessage, UIMessageType} from "../../main/types/UIMessage";
import AlertMessage from "../util/AlertMessage";

type RegistrationState = {
    username: string,
    email: string,
    password: string,
    passwordReply: string,

    regProcessing: boolean,
    activateValidation: boolean

    notificationMessage: UIMessage | null
}

const InputsNames = {
    emailInputName: 'email',
    usernameInputName: 'username',
    passwordInputName: 'password',
    passwordReplyInputName: 'passwordReply'
}

class Registration extends React.Component<any, RegistrationState> {

    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordReply: "",
            regProcessing: false,
            activateValidation: false,
            notificationMessage: null
        }
    }

    render() {
        return <div className="tab-pane fade my-3" id="register" role="tabpanel" aria-labelledby="contact-tab">
            {this.state.notificationMessage != null &&
            <AlertMessage message={this.state.notificationMessage.message}
                          messageType={this.state.notificationMessage.messageType} onClose={this.RemoveMessage}/>
            }
            <div>
                <label htmlFor="new-email" className="form-label">Email address</label>
                <ValidateInput
                    type="text"
                    className='form-control'
                    id="new-email"
                    name={InputsNames.emailInputName}
                    value={this.state.password}
                    activateBeforeTouch={this.state.activateValidation}
                    errorMsg={this.EmailValidateRule()}
                    onChange={this.InputChangeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="new-username" className="form-label">Username</label>
                <ValidateInput
                    type="text"
                    className='form-control'
                    id="new-username"
                    name={InputsNames.usernameInputName}
                    value={this.state.password}
                    activateBeforeTouch={this.state.activateValidation}
                    errorMsg={this.UsernameValidateRule()}
                    onChange={this.InputChangeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="new-password" className="form-label">Password</label>
                <ValidateInput
                    type="password"
                    className='form-control'
                    id="new-password"
                    name={InputsNames.passwordInputName}
                    value={this.state.password}
                    activateBeforeTouch={this.state.activateValidation}
                    errorMsg={this.PasswordValidateRule()}
                    onChange={this.InputChangeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="new-password-reply" className="form-label">Reply password</label>
                <ValidateInput
                    type="password"
                    className='form-control'
                    id="new-password-reply"
                    name={InputsNames.passwordReplyInputName}
                    value={this.state.password}
                    activateBeforeTouch={this.state.activateValidation}
                    errorMsg={this.PasswordReplyValidateRule()}
                    onChange={this.InputChangeHandler}/>
            </div>
            <LoadableBtn id="reg-btn"
                         onClick={this.RegBtnClickHandler}
                         loading={this.state.regProcessing}>
                Registration
            </LoadableBtn>
        </div>
    }

    RegBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            activateValidation: true
        }, async () => {
            let email = this.state.email
            let username = this.state.username
            let password = this.state.password
            let passReply = this.state.passwordReply
            if (NotEmptyValidateForall([email, username, password, passReply])
                && EmailValidate(email)
                && EqualityValidate(password, passReply)) {
                await this.setState({
                    regProcessing: true
                }, async () => {
                    let {email, username, password} = this.state
                    let resultMessage = {
                        message: 'Success registration!',
                        messageType: UIMessageType.SUCCESS
                    }
                    try {
                        await RegUser(email, username, password)
                    } catch (e) {
                        resultMessage = {
                            message: 'Error while registration!',
                            messageType: UIMessageType.ERROR
                        }
                    } finally {
                        this.setState({
                            regProcessing: false,
                            notificationMessage: resultMessage
                        })
                    }
                })
            }
        })
    }

    EmailValidateRule = (): string => {
        let email = this.state.email
        let notEmpty = NotEmptyValidate(email)
        if (!notEmpty) {
            return "Email can't be empty!"
        }
        let emailValid = EmailValidate(email)
        if (!emailValid) {
            return "Email is invalid!"
        }
        return ""
    }

    PasswordValidateRule = (): string => {
        return NotEmptyValidate(this.state.password) ? "" : "Password can't be empty!"
    }

    UsernameValidateRule = (): string => {
        return NotEmptyValidate(this.state.username) ? "" : "Username can't be empty!"
    }

    PasswordReplyValidateRule = (): string => {
        let passReply = this.state.passwordReply
        let notEmpty = NotEmptyValidate(passReply)
        if (!notEmpty) {
            return "Password reply can't be empty!"
        }
        let equal = EqualityValidate(passReply, this.state.password)
        if (!equal) {
            return "Passwords are not equal!"
        }
        return ""
    }

    InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target
        let name = target.name
        let inputValue = e.target.value
        this.setState({[name]: inputValue} as Pick<RegistrationState, any>)
    }

    RemoveMessage = () => {
        this.setState({
            notificationMessage: null
        })
    }
}

export default Registration