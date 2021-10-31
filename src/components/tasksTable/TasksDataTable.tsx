import React from "react";
import {Task} from "../../main/types/Task";
import {TasksContext} from "../../main/context/TasksContext";
import TasksTableBody from "./TasksTableBody";
import TasksTableHead from "./TasksTableHead";

class TasksDataTable extends React.Component<any, any> {
    static contextType = TasksContext;

    render() {
        let tasks: Task[] = this.context.tasks
        let tableBordersClass = ''
        if(tasks.length > 0) {
            tableBordersClass = 'table-bordered'
        }
        return <table id="task-table" className={`table ${tableBordersClass}`}>
            <thead id="table-head">
            {tasks.length > 0 &&
                <TasksTableHead/>
            }
            </thead>
            <tbody id="table-body">
            <TasksTableBody tasks={tasks}/>
            </tbody>
        </table>
    }
}

export default TasksDataTable