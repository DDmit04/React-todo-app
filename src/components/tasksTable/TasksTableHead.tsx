import React from "react";
import {TasksContext} from "../../main/context/TasksContext";
import {TasksSortingDirection, TasksSortingField} from "../../main/types/Task"
import {CaretDownFill, CaretUpFill} from 'react-bootstrap-icons'

type TasksTableHeadState = {
    sortingField: TasksSortingField,
    sortingDirection: TasksSortingDirection
}

const ButtonsNames = {
    indexBtnName: TasksSortingField.CREATION_DATE,
    descBtnName: TasksSortingField.DESCRIPTION,
    startDateBtnName: TasksSortingField.START_DATE,
    endDateBtnName: TasksSortingField.END_DATE,
    completedBtnName: TasksSortingField.COMPLETED
}

class TasksTableHead extends React.Component<any, TasksTableHeadState> {
    static contextType = TasksContext;

    constructor(props: any) {
        super(props);
        this.state = {
            sortingField: TasksSortingField.CREATION_DATE,
            sortingDirection: TasksSortingDirection.ASC
        }
    }

    render() {
        let sortDirIcon
        let {sortingDirection, sortingField} = this.state
        if (sortingDirection === TasksSortingDirection.DESC) {
            sortDirIcon = <CaretDownFill/>
        } else {
            sortDirIcon = <CaretUpFill/>
        }
        return <tr>
            <th scope="col" className="col-1">
                <button className="btn btn-outline-dark sort-task-btn"
                        name={ButtonsNames.indexBtnName.toString()}
                        onClick={this.BtnClickHandler}>
                    new{' '}{sortingField === TasksSortingField.CREATION_DATE && sortDirIcon}
                </button>
            </th>
            <th scope="col" className="col-7">
                <button className="btn btn-outline-dark sort-task-btn"
                        name={ButtonsNames.descBtnName.toString()}
                        onClick={this.BtnClickHandler}>
                    description{' '}{sortingField === TasksSortingField.DESCRIPTION && sortDirIcon}
                </button>
            </th>
            <th scope="col" className="col-1">
                <button className="btn btn-outline-dark sort-task-btn"
                        name={ButtonsNames.startDateBtnName.toString()}
                        onClick={this.BtnClickHandler}>
                    starts{' '}{sortingField === TasksSortingField.START_DATE && sortDirIcon}
                </button>
            </th>
            <th scope="col" className="col-1">
                <button className="btn btn-outline-dark sort-task-btn"
                        name={ButtonsNames.endDateBtnName.toString()}
                        onClick={this.BtnClickHandler}>
                    ends{' '}{sortingField === TasksSortingField.END_DATE && sortDirIcon}
                </button>
            </th>
            <th scope="col" className="col-1">
                <button className="btn btn-outline-dark sort-task-btn"
                        name={ButtonsNames.completedBtnName.toString()}
                        onClick={this.BtnClickHandler}>
                    done{' '}{sortingField === TasksSortingField.COMPLETED && sortDirIcon}
                </button>
            </th>
            <th scope="col" className="col-1">
                <button className="btn btn-outline-dark sort-task-btn disabled">delete</button>
            </th>
        </tr>;
    }

    BtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        let target = e.currentTarget
        let name = +target.name
        let newDirection = this.state.sortingDirection
        if(this.state.sortingField === name) {
            if(this.state.sortingDirection === TasksSortingDirection.ASC) {
                newDirection = TasksSortingDirection.DESC
            } else {
                newDirection = TasksSortingDirection.ASC
            }
        }
        this.setState({
            sortingField: name,
            sortingDirection: newDirection
        }, () => {
            this.context.sortBy(this.state.sortingField, this.state.sortingDirection)
        })
    }
}

export default TasksTableHead