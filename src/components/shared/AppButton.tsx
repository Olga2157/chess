import * as React from 'react'
import {Link} from "react-router-dom"
import {MouseEventHandler} from "react";

type AppButtonProps = {
    buttonId: string;
    buttonText: string,
    path?: string,
    class?: string,
    listener?: MouseEventHandler<HTMLButtonElement>
}
type AppButtonState = {}

class AppButton extends React.Component<AppButtonProps, AppButtonState> {

    render() {
        if (this.props.path) {
            return (
                <Link to={this.props.path}>
                    <button id={this.props.buttonId}>{this.props.buttonText}</button>
                </Link>)
        } else
            if (this.props.listener) {
                return (
                    <button id={this.props.buttonId} onClick={this.props.listener} className={this.props.class}>{this.props.buttonText}</button>
                );
            } else {
                return (
                    <button id={this.props.buttonId} onClick={this.props.listener} className={this.props.class}>{this.props.buttonText}</button>
                );
            }

    }
}

export default AppButton
