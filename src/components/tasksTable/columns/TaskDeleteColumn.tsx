import React from "react";
import {TasksContext} from "../../../main/context/TasksContext"
import LoadableBtn from "../../util/LoadableBtn";
import {TrashFill} from 'react-bootstrap-icons'

type TaskDeleteColumnProps = {
    taskId: string
}

type TaskDeleteColumnState = {
    deletingProcessing: boolean
}

class TaskDeleteColumn extends React.Component<TaskDeleteColumnProps, TaskDeleteColumnState> {
    static contextType = TasksContext;

    constructor(props: TaskDeleteColumnProps) {
        super(props);
        this.state = {
            deletingProcessing: false
        }
    }

    render() {
        return <LoadableBtn className="delete-task-btn btn btn-danger btn-sm"
                            onClick={() => this.DeleteBtnClickHandler(this.props.taskId)}
                            loading={this.state.deletingProcessing}>
            <TrashFill/>
        </LoadableBtn>
    }

    DeleteBtnClickHandler = async (taskId: string) => {
        this.setState({
            deletingProcessing: true
        }, async () => {
            await this.context.deleteTask(taskId)
        })
    }
}

export default TaskDeleteColumn