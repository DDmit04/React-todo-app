import React from "react";
import Card from "../components/content/Card";
import TaskInput from "../components/content/TaskInput";
import TasksDataTable from "../components/tasksTable/TasksDataTable";

class TasksPage extends React.Component<any, any> {
    render() {
        return <Card cardHeader="TODO list">
            <TaskInput/>
            <hr className="my-3"/>
            <TasksDataTable/>
        </Card>;
    }
}
export default TasksPage