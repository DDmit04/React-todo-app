import React from "react";
import {TasksContext} from "../../../main/context/TasksContext"
import LoadableBtn from "../../util/LoadableBtn";
import {CheckCircle, XCircle} from 'react-bootstrap-icons'

type TaskCompleteColumnProps = {
    taskId: string
    taskCompleted: boolean
}

type TaskCompleteColumnState = {
    turningProcessing: boolean
}

class TaskCompleteColumn extends React.Component<TaskCompleteColumnProps, TaskCompleteColumnState> {
    static contextType = TasksContext;

    constructor(props: TaskCompleteColumnProps) {
        super(props);
        this.state = {
            turningProcessing: false
        }
    }

    render() {
        let {taskCompleted, taskId} = this.props
        let btnClass
        let btnText
        let btnIcon
        if (taskCompleted) {
            btnClass = 'btn-success'
            btnText = 'Yes'
            btnIcon = <CheckCircle/>
        } else {
            btnClass = 'btn-danger'
            btnText = 'No'
            btnIcon = <XCircle/>
        }
        return <LoadableBtn className={"turn-task-btn btn btn-sm " + btnClass}
                            onClick={() => this.TurnBthClickHandler(taskId)}
                            loading={this.state.turningProcessing}>
            <>{btnText}{' '}{btnIcon}</>
        </LoadableBtn>;
    }

    TurnBthClickHandler = async (taskId: string) => {
        this.setState({
            turningProcessing: true
        }, async () => {
            await this.context.turnTask(taskId)
            await this.setState({
                turningProcessing: false
            })
        })
    }
}

export default TaskCompleteColumn