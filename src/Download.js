import React from "react";
import './App.css';


class Download extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cursorVisible: true
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let string = "";

        for(let i = 0; i < this.props.text.length; i++) {
            string += this.props.text[i] + "\n";
        }

        let a         = document.createElement('a');
        a.href        = 'data:attachment/txt,' +  encodeURIComponent(string);
        a.target      = '_blank';
        a.download    = 'myFile.txt';

        document.body.appendChild(a);
        a.click();
    }

    render() {
        return (
            <div className="Download" onClick={this.onClick}>
                Download
            </div>
        );
    }
}

export default Download;
