import {doRequest, HttpMethodType} from "./Request";
import {Task, TaskRequest} from "../types/Task";

export const AddTask = async (newTask: TaskRequest): Promise<Task> => {
    return await doRequest(
        "task/",
        HttpMethodType.POST,
        JSON.stringify(newTask),
        {"Content-Type": "application/json; charset=utf-8"}
    )
}

export const GetTasks = async (): Promise<Task[]> => {
    return await doRequest("task/", HttpMethodType.GET)
}

export const DeleteTask = async (taskId: string) => {
    return await doRequest("task/" + taskId, HttpMethodType.DELETE)
}

export const TurnTask = async (taskId: string) => {
    return await doRequest("task/" + taskId, HttpMethodType.PATCH)
}