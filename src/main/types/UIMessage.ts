enum UIMessageType {
    INFO,
    ERROR,
    WARNING,
    SUCCESS
}

type UIMessage = {
    message: string,
    messageType: UIMessageType
}

export type {UIMessage}
export {UIMessageType}