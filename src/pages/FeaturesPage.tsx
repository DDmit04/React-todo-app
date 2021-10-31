import React from "react";
import Card from "../components/content/Card";

class FeaturesPage extends React.Component<any, any> {
    render() {
        return <Card cardHeader="Features">
            <ul className="list-group">
                <li className="list-group-item">Edit tasks data - can change tasks dates and description!</li>
                <li className="list-group-item">Tasks pagination!</li>
            </ul>
        </Card>;
    }
}

export default FeaturesPage