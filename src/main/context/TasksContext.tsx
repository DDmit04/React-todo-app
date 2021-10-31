import {Task, TasksSortingField, TasksSortingDirection} from "../types/Task";
import React from "react";

type TasksContextType = {
    tasks: Task[],
    addTask(taskDesc: string, taskStart: string, taskEnd: string): void,
    turnTask(taskId: string): void,
    deleteTask(taskId: string): void,
    sortBy(sortField: TasksSortingField, direction: TasksSortingDirection): void
}

let defaultTasksContext: TasksContextType = {
    tasks: [],
    addTask: (taskDesc: string, taskStart: string, taskEnd: string) => {},
    turnTask: (taskId: string) => {
        console.error(`Turn [taskId: ${taskId}] task not implemented!`)
    },
    deleteTask: (taskId: string) => {
        console.error(`Delete [taskId: ${taskId}] task not implemented!`)
    },
    sortBy(sortField: TasksSortingField, direction: TasksSortingDirection) {
        console.error(`Task sorting function not implemented!`)
    }
}
export const TasksContext = React.createContext(defaultTasksContext)
TasksContext.displayName = 'TasksContext';

export type {TasksContextType}