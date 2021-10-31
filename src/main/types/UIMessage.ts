export enum UIMessageType {
    INFO,
    ERROR,
    WARNING,
    SUCCESS
}

export type UIMessage = {
    message: string,
    messageType: UIMessageType
}