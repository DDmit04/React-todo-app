import React from "react";
import "../../css/navbar.css"
import UserContext from "../../main/context/UserContext"
import LoadableElement from "../util/LoadableElement";
import {BoxArrowRight} from 'react-bootstrap-icons'

class RightNavbar extends React.Component<any, { logoutProcessing: boolean }> {
    static contextType = UserContext;

    constructor(props: any) {
        super(props);
        this.state = {
            logoutProcessing: false
        }
    }

    render() {
        let currentUser = this.context.user
        let userAuth
        if (currentUser != null && currentUser.id != null) {
            userAuth = <>
                    <li className='nav-item my' id='right-nav-user'>
                        <a id='right-nav-user-link'>{currentUser.username}</a>
                    </li>
                    <li id="mail-link" className="nav-item my">
                        <a id="mail-btn" className="nav-link" onClick={this.LogOutBtnClickHandler}>
                            <LoadableElement loading={this.state.logoutProcessing}>
                                <BoxArrowRight/>
                            </LoadableElement>
                        </a>
                    </li>
                </>
        } else {
            userAuth =
                <li className='nav-item my' id="right-nav-auth">
                    <a className='nav-link' data-bs-target="#nav-modal"
                       data-bs-toggle='modal'>Authorize</a>
                </li>
        }
        return <ul className='navbar-nav ms-auto'>
            {userAuth}
        </ul>
    }

    LogOutBtnClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        this.setState({
            logoutProcessing: true
        }, async () => {
            await this.context.logoutUser()
            this.setState({
                logoutProcessing: false
            })
        })
    }
}

export default RightNavbar