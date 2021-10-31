import React from "react";
import {Task} from "../../main/types/Task";
import TaskDataRow from "./TaskDataRow";

type TableBodyProps = {
    tasks: Task[]
}

class TasksTableBody extends React.Component<TableBodyProps, any> {

    render() {
        let tableBody
        let tasks = this.props.tasks
        if (tasks.length > 0) {
            tableBody = tasks.map((task, index) => {
                return <tr key={task.id}>
                    <TaskDataRow index={index + 1} task={task}/>
                </tr>
            })
        } else {
            tableBody = <tr>
                <td>
                    <h1 id="no-tasks-placeholder" className='empty-list my-3'>Nothing to do :(</h1>
                </td>
            </tr>
        }
        return tableBody;
    }
}

export default TasksTableBody