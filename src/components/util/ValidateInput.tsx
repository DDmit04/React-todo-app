import React from "react"

type ValidateInputProps = {
    activateBeforeTouch: boolean,
    errorMsg: string
}

type ValidateInputState = {
    touched: boolean
}

class ValidateInput extends React.Component<ValidateInputProps & React.HTMLAttributes<HTMLInputElement> & React.HTMLProps<HTMLInputElement>, ValidateInputState> {
    static defaultProps: ValidateInputProps & React.HTMLAttributes<HTMLInputElement> & React.HTMLProps<HTMLInputElement> = {
        activateBeforeTouch: false,
        errorMsg: ""
    }


    constructor(props: ValidateInputProps) {
        super(props)
        this.state = {
            touched: false,
        }
    }

    render() {
        const {onChange, errorMsg, activateBeforeTouch, value, className, ...inputAttributes} = this.props
        let validationClass = this.GetValidationClass(errorMsg)
        return <div>
            <input {...inputAttributes} className={className + ' ' + validationClass}
                   onChange={this.InputChangeHandler}/>
            <div className="invalid-feedback">
                {errorMsg}
            </div>
        </div>
    }

    GetValidationClass = (error: string): string => {
        if (this.props.activateBeforeTouch || this.state.touched) {
            if (error === '') {
                return 'is-valid'
            } else {
                return 'is-invalid'
            }
        } else {
            return ''
        }
    }
    InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            touched: true,
        })
        if (this.props.onChange != null) {
            this.props.onChange(e)
        }
    }
}

export default ValidateInput