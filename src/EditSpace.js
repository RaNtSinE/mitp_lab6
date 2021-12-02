import React from "react";
import './App.css';


class EditSpace extends React.Component{

    onFocus() {
        console.log("focus");
    }

    onClick() {
        console.log("click")
    }

    render() {
        return (
            <div className="EditSpace" onFocus={this.onFocus}>
                {this.props.text}
            </div>
        );
    }
}

export default EditSpace;
