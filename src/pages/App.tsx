import React from 'react';
import "../css/main.css"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer";
import AuthModal from "../components/auth/AuthModal"
import {User} from "../main/types/User";
import UserContext from "../main/context/UserContext";
import {TasksContext} from "../main/context/TasksContext";
import {Task, TaskRequest, TasksSortingDirection, TasksSortingField} from "../main/types/Task";
import TasksPage from "./TasksPage";
import FeaturesPage from "./FeaturesPage";
import {SortTasks} from "../main/utils/SortUtils";
import {SetupDatepicker} from "../main/SetupDatepicker";
import {AuthUser, GetUser, SignOutUser} from "../main/ request/UserApi";
import {GetTasks, AddTask, DeleteTask, TurnTask} from "../main/ request/TaskApi";
import GlobalErrorsBoundary from "../components/content/GlobalErrorsBoundary";

SetupDatepicker()

type AppState = {
    currentUser: User | null
    tasks: Task[]
}

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: null,
            tasks: []
        }
    }

    async componentDidMount() {
        let user = await this.LoadUser()
        if (user != null) {
            this.setState({
                currentUser: user
            }, async () => {
                let tasks = await this.LoadTasks()
                this.setState({
                    tasks: tasks
                })
            })
        } else {
            this.setState({
                currentUser: null,
                tasks: []
            })
        }
    }

    render() {
        let userContext = {
            user: this.state.currentUser,
            logoutUser: async () => {
                await SignOutUser()
                this.setState({
                    currentUser: null,
                    tasks: []
                })
            },
            loginUser: async (usernameOrEmail: string, password: string) => {
                let user = await AuthUser(usernameOrEmail, password)
                this.setState({
                    currentUser: user
                })
            }
        }
        let tasksContext = {
            tasks: this.state.tasks,
            addTask: async (taskDesc: string, taskStart: string, taskEnd: string) => {
                let newTask: TaskRequest = {
                    description: taskDesc,
                    start: taskStart || 'any',
                    end: taskEnd || 'any',
                }
                let addedTask = await AddTask(newTask)
                this.setState({
                    tasks: [...this.state.tasks, addedTask]
                })
            },
            turnTask: async (taskId: string) => {
                await TurnTask(taskId)
                let moddedTasks = this.state.tasks
                let taskToTurnIndex = moddedTasks.findIndex(task => task.id === taskId)
                if (taskToTurnIndex !== -1) {
                    let completed = moddedTasks[taskToTurnIndex].completed
                    moddedTasks[taskToTurnIndex].completed = !completed
                    this.setState({
                        tasks: moddedTasks
                    })
                }
            },
            deleteTask: async (taskId: string) => {
                await DeleteTask(taskId)
                let filteredTasks = this.state.tasks.filter(task => task.id !== taskId)
                this.setState({
                    tasks: filteredTasks
                })
            },
            sortBy: (sortField: TasksSortingField, direction: TasksSortingDirection) => {
                let sortedTasks = SortTasks(this.state.tasks, sortField, direction)
                this.setState({
                    tasks: sortedTasks
                })
            }
        }
        const pathname = window.location.pathname
        return <div>
            <UserContext.Provider value={userContext}>
                <Navbar/>
                <AuthModal/>
            </UserContext.Provider>
            <TasksContext.Provider value={tasksContext}>
                <div className="container">
                    <GlobalErrorsBoundary>
                        {pathname === '/' ? (
                            <TasksPage/>
                        ) : (
                            <FeaturesPage/>)
                        }
                    </GlobalErrorsBoundary>
                </div>
            </TasksContext.Provider>
            <Footer/>
        </div>
    }

    LoadTasks = async (): Promise<Task[]> => {
        let loadResult: Task[] = await GetTasks()
        if (loadResult == null) {
            loadResult = []
        }
        return loadResult
    }
    LoadUser = async (): Promise<any> => {
        let loadedUser = await GetUser()
        return loadedUser
    }
}

export default App
