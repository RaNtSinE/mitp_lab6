import React from "react";
import './App.css';
import EditSpace from "./EditSpace";

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            careta: "|"
        }

        this.onKeyDown = this.onKeyDown.bind(this);

        window.addEventListener("keydown", this.onKeyDown);
    }

    onKeyDown(e) {
        switch (e.key) {
            case "Backspace":
                this.
                break;
            default:
                this.setState({text: this.state.text + e.key});
                break;
        }
        console.log(e.key);
    }

    render() {
        return (
            <div className="App">
                <EditSpace text={this.state.text}/>
            </div>
        );
    }
}

export default App;
