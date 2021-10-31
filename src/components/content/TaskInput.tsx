import React from "react";
import LoadableBtn from "../util/LoadableBtn";
import {TasksContext} from "../../main/context/TasksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DateToString} from "../../main/utils/ConvertUtils";


type TaskInputState = {
    desc: string
    startDate: any,
    endDate: any,
    startDateString: string,
    endDateString: string,
    taskAddProcessing: boolean
}

const InputsNames = {
    startDateInputName: "startDate",
    endDateInputName: "endDate",
    descInputName: "desc"
}

class TaskInput extends React.Component<any, TaskInputState> {
    static contextType = TasksContext;

    constructor(props: any) {
        super(props);
        this.state = {
            desc: '',
            startDate: null,
            endDate: null,
            startDateString: '',
            endDateString: '',
            taskAddProcessing: false
        }
    }

    render() {
        return <div className="input-group">
            <textarea id="task-desc"
                      className="form-control"
                      placeholder="Input new task..."
                      name={InputsNames.descInputName}
                      value={this.state.desc}
                      onChange={this.InputChangeHandler}></textarea>
            <div>
                <span className="input-group-text">from date</span>
                <DatePicker
                    id="task-start-date"
                    className="date-pick input-sm form-control"
                    value={this.state.startDateString}
                    name={InputsNames.startDateInputName}
                    selected={this.state.startDate}
                    onChange={(date) => this.StartDateInputChangeHandler(date)}
                />
            </div>
            <div>
                <span className="input-group-text">to date</span>
                <DatePicker
                    id="task-end-date"
                    className="date-pick input-sm form-control"
                    value={this.state.endDateString}
                    name={InputsNames.endDateInputName}
                    selected={this.state.endDate}
                    onChange={(date) => this.EndDateInputChangeHandler(date)}/>
            </div>
            <LoadableBtn id="add-task-btn"
                         loading={this.state.taskAddProcessing}
                         onClick={this.AddTaskClickHandler}>Add</LoadableBtn>
        </div>
    }

    StartDateInputChangeHandler = (date: any) => {
        if(date != null) {
            this.setState({
                startDate: date,
                startDateString: DateToString(date)
            })
        }
    }

    EndDateInputChangeHandler = (date: any) => {
        if(date != null) {
            this.setState({
                endDate: date,
                endDateString: DateToString(date)
            })
        }
    }

    InputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let target = e.target
        let name = target.name
        let inputValue = e.target.value
        this.setState({[name]: inputValue} as Pick<TaskInputState, any>)
    }

    AddTaskClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            taskAddProcessing: true
        }, async () => {
            let {desc, startDate, endDate} = this.state
            await this.context.addTask(desc, startDate, endDate)
            this.setState({
                taskAddProcessing: false,
                desc: '',
                startDate: null,
                endDate: null,
                startDateString: '',
                endDateString: ''
            })
        })
    }
}

export default TaskInput