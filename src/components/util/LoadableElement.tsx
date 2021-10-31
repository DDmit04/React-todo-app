import React from "react";

type LoadableElementProps = {
    small: boolean
    loading: boolean,
    spinnerColorType: string,
    spinnerType: string,
}

class LoadableElement extends React.Component<LoadableElementProps> {
    static defaultProps = {
        small: true,
        loading: false,
        spinnerColorType: 'text-primary',
        spinnerType: "spinner-border",
    }

    render() {
        let element
        const {small, spinnerColorType, spinnerType} = this.props
        let spinnerClass = spinnerType
        if(small) {
            spinnerClass += " " + spinnerType + '-sm'
        }
        if (this.props.loading) {
            element =
                <div className={spinnerClass + ` ` + spinnerColorType}>
                    <span className="sr-only"></span>
                </div>
        } else {
            element = this.props.children
        }
        return element
    }
}

export default LoadableElement