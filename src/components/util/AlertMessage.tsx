import React from "react";
import {UIMessage, UIMessageType} from "../../main/types/UIMessage";

type MessageProps = {
    message: UIMessage
    onClose(): void
}

class AlertMessage extends React.Component<MessageProps, any> {
    render() {
        let messageClass
        if (this.props.message != null) {
            switch (this.props.message.messageType) {
                case UIMessageType.ERROR:
                    messageClass = 'alert-error'
                    break
                case UIMessageType.INFO:
                    messageClass = 'alert-info'
                    break
                case UIMessageType.WARNING:
                    messageClass = 'alert-warning'
                    break
                case UIMessageType.SUCCESS:
                    messageClass = 'alert-success'
                    break
            }
        }
        return <div className={`alert ${messageClass} alert-dismissible fade show`} role="alert">
            {this.props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={this.props.onClose}
                    aria-label="Close"></button>
        </div>
    }
}

export default AlertMessage