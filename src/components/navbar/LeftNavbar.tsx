import React from "react";
import "../../css/navbar.css"
import AppIcon from "../../resources/todoList.png"
import UserContext from "../../main/context/UserContext";
import LoadableElement from "../util/LoadableElement";
import {MailTasks} from "../../main/ request/UserApi";
import MailException from "../../main/exceptions/MailException";

class LeftNavbar extends React.Component<any, { mailProcessing: boolean }> {
    static contextType = UserContext;

    constructor(props: any) {
        super(props);
        this.state = {
            mailProcessing: false
        }
    }

    render() {
        let currentUser = this.context.user
        let mailTasksElement =
            <li id="mail-link" className="nav-item my">
                <a id="mail-btn" className="nav-link" onClick={this.MailTasksBtnClickHandler}>
                    <LoadableElement loading={this.state.mailProcessing}>
                        Mail me this
                    </LoadableElement>
                </a>
            </li>
        if(currentUser == null || currentUser.id == null) {
            mailTasksElement = <React.Fragment></React.Fragment>
        }
        return <ul className="navbar-nav">
            <li className="nav-item my">
                <img className="nav-ico-image" src={AppIcon}/>
            </li>
            <li className="nav-item my">
                <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item my">
                <a className="nav-link" href="/features">next features</a>
            </li>
            {mailTasksElement}
        </ul>
    }

    MailTasksBtnClickHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if(!this.state.mailProcessing) {
            this.setState({mailProcessing: true}, async () => {
                await MailTasks()
                this.setState({mailProcessing: false})
            })
        }
    }
}

export default LeftNavbar