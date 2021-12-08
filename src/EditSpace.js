import React from "react";
import './App.css';


class EditSpace extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cursorVisible: true
        }

        this.cursorTimerID = null;
        this.cursorListener = this.cursorListener.bind(this);
    }

    componentDidMount() {
        if (!this.cursorTimerID)
            this.cursorTimerID = setInterval(this.cursorListener, 500)
    }

    cursorListener() {
        this.setState({cursorVisible: !this.state.cursorVisible});
    }

    onFocus() {
        console.log("focus");
    }

    onClick() {
        console.log("click")
    }

    render() {
        // let leftText = this.props.text.substr(0, this.props.cursorPositon);
        // let rightText = this.props.text.substr(this.props.cursorPositon, this.props.text.length);
        let display = "";
        let leftText = "";
        let rightText = "";

        for (let i = 0; i < this.props.cursorPositon[0]; i++) {
            leftText += this.props.text[i] + "\n";
        }
        leftText += this.props.text[this.props.cursorPositon[0]].substr(0, this.props.cursorPositon[1]);
        rightText += this.props.text[this.props.cursorPositon[0]].substr(this.props.cursorPositon[1], this.props.text[this.props.cursorPositon[0]].length) + "\n";

        for (let i = this.props.cursorPositon[0] + 1; i < this.props.text.length; i++) {
            rightText += this.props.text[i] + "\n";
        }

        if (!this.state.cursorVisible)
            display = "none";
        return (
            <div className="EditSpace" onFocus={this.onFocus}>
                {leftText}<span className={"Cursor"} style={{display: display}}>|</span>
                {rightText}
            </div>
        );
    }
}

export default EditSpace;
