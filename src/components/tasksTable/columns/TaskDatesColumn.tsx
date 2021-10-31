import React from "react";

type TaskDatesColumnProps = {
    taskStartDate: string,
    taskEndDate: string
}

class TaskDatesColumn extends React.Component<TaskDatesColumnProps, any> {
    static defaultProps: TaskDatesColumnProps = {
        taskStartDate: 'Any',
        taskEndDate: 'Any'
    }

    render() {
        let dateBlock
        let {taskStartDate, taskEndDate} = this.props
        if (taskStartDate.toLowerCase() === 'any' && taskEndDate.toLowerCase() === 'any') {
            dateBlock =
                <td className="col-2 task-date" colSpan={2}>Any</td>
        } else {
            dateBlock =
                <>
                    <td className="col-1 task-date">{taskStartDate}</td>
                    <td className="col-1 task-date">{taskEndDate}</td>
                </>
        }
        return dateBlock;
    }
}

export default TaskDatesColumn