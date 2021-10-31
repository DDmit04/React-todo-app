type Task = {
    id: string,
    description: string,
    start: Date,
    end: Date,
    completed: boolean,
    creationDate: Date
}

type TaskRequest = {
    description: string,
    start: string,
    end: string
}

enum TasksSortingField {
    CREATION_DATE,
    DESCRIPTION,
    COMPLETED,
    START_DATE,
    END_DATE
}

enum TasksSortingDirection {
    ASC,
    DESC
}

export type {Task, TaskRequest}
export {TasksSortingField, TasksSortingDirection}