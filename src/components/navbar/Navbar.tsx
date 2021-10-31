import React from "react";
import RightNavbar from "./RightNavbar"
import '../../css/navbar.css'
import LeftNavbar from "./LeftNavbar";


class Navbar extends React.Component<any, any> {
    render() {
        return <nav className="navbar navbar-expand-md my-nav shadowed">
            <div className="container-fluid">
                <div id="left-nav" className="navbar-collapse w-100 order-1">
                    <LeftNavbar/>
                </div>
                <div id="right-nav" className="navbar-collapse w-100 order-3">
                    <RightNavbar/>
                </div>
            </div>
        </nav>
    }
}

export default Navbar