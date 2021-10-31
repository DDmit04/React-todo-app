import React from "react";
import TaskDatesColumn from "./columns/TaskDatesColumn";
import TaskCompleteColumn from "./columns/TaskCompleteColumn";
import TaskDeleteColumn from "./columns/TaskDeleteColumn";
import {Task} from "../../main/types/Task";
import {DateToString} from "../../main/utils/ConvertUtils";

type TaskDataRowProps = {
    index: number,
    task: Task
}

class TaskDataRow extends React.Component<TaskDataRowProps, any> {
    render() {
        let {task} = this.props
        return <>
            <th className="col-1" scope="row">{DateToString(task.creationDate)}</th>
            <td className="col-7">{task.description}</td>
            <TaskDatesColumn taskStartDate={DateToString(task.start)} taskEndDate={DateToString(task.end)}/>
            <td className="col-1">
                <TaskCompleteColumn taskCompleted={task.completed} taskId={task.id}/>
            </td>
            <td className="col-1">
                <TaskDeleteColumn taskId={task.id}/>
            </td>
        </>
    }
}

export default TaskDataRow