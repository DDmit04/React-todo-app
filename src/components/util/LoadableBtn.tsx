import React from "react";

interface LoadableProps extends React.HTMLAttributes<HTMLButtonElement>{
    small: boolean
    loading: boolean,
    btnColor: string,
    spinnerType: string,
}

class LoadableBtn extends React.Component<LoadableProps> {
    static defaultProps: LoadableProps = {
        small: true,
        loading: false,
        btnColor: "btn-primary",
        spinnerType: "spinner-border",
    }

    render() {
        const {small, loading, btnColor, className, spinnerType, ...btnAttributes} = this.props
        let spinnerClass = spinnerType
        if(small) {
            spinnerClass += " " + spinnerType + '-sm'
        }
        return <button className={"btn " + btnColor + " " + className} {...btnAttributes} disabled={loading}>
            {loading &&
            <span className={spinnerClass} role="status" aria-hidden="true"></span>
            }
            {' '}{this.props.children}
        </button>;
    }
}

export default LoadableBtn