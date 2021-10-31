import React from "react";

type CardProps = {
    cardHeader: string
}

class Card extends React.Component<CardProps, any> {
    render() {
        return <div className="card shadowed rounded">
            <div className="card-body">
                <h1 className="border-bottom card-title todo-title rounded">{this.props.cardHeader}</h1>
                <hr className="my-3"/>
            {this.props.children}
            </div>
        </div>
    }
}

export default Card