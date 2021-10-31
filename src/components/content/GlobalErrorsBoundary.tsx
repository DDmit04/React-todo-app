import React, {ErrorInfo} from "react";
import Exception from "../../main/exceptions/Exception";
import AlertMessage from "../util/AlertMessage";
import {UIMessage, UIMessageType} from "../../main/types/UIMessage";

type ErrorMessage = {
    id: string,
    message: string
}
type GlobalErrorsBoundaryState = {
    errors: ErrorMessage[]
}

class GlobalErrorsBoundary extends React.Component<any, GlobalErrorsBoundaryState> {

    constructor(props: any) {
        super(props);
        this.state = {
            errors: []
        }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (typeof error == typeof Exception) {
            let newErrMsg: ErrorMessage = {
                id: Math.random().toString(36).substr(2, 9),
                message: error.message
            }
            this.setState({
                errors: [...this.state.errors, newErrMsg]
            })
        } else {
            throw error
        }
    }

    render() {
        let errorBlock = <></>
        this.state.errors.map(error => {
            let message: UIMessage = {
                message: error.message,
                messageType: UIMessageType.ERROR
            }
            return <AlertMessage key={error.id} message={message.message} messageType={message.messageType}
                                 onClose={() => this.RemoveMessage(error.id)}/>
        })
        return <>
            {errorBlock}
            {this.props.children}
        </>
    }

    RemoveMessage = (messageId: string) => {
        let updatedErrors = this.state.errors.filter(error => error.id != messageId)
        this.setState({
            errors: updatedErrors
        })
    }
}

export default GlobalErrorsBoundary