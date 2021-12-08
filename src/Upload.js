import React from "react";
import './App.css';


class Upload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cursorVisible: true
        }

        this.data = "";

        this.onChange = this.onChange.bind(this);
        this.parseData = this.parseData.bind(this);
    }

    async onChange(e) {
        let files = e.target.files;
        let file = files[0];
        let reader = new FileReader();
        reader.onload = this.parseData;
        reader.readAsText(file);
    }

    parseData(event) {
        let text = event.target.result;
        text = text.split("\n");
        this.props.setText(text);
        console.log(event.target.result);
    }

    render() {
        return (
            <input name="uploadFile" type="file" className="Upload" onChange={this.onChange}/>
        );
    }
}

export default Upload;
