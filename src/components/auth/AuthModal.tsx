import React from "react";
import Auth from "./Auth";
import Registration from "./Registration";

class AuthModal extends React.Component<any, any> {
    render() {
        return <div className="modal fade" id="nav-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Auth</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#auth"
                                   role="tab"
                                   aria-selected="true">Authorize</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#register"
                                   role="tab"
                                   aria-selected="false">Registration</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <Auth/>
                            <Registration/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default AuthModal