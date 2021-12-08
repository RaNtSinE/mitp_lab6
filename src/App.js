import React from "react";
import './App.css';
import EditSpace from "./EditSpace";
import Download from "./Download";
import Upload from "./Upload";

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            text: [""],
            cursorPosition: [0,0],
        }

        this.onKeyDown = this.onKeyDown.bind(this);
        this.setText = this.setText.bind(this);


        window.addEventListener("keydown", (e)=>this.onKeyDown(e));


        if (!String.prototype.splice) {
            /**
             * {JSDoc}
             *
             * The splice() method changes the content of a string by removing a range of
             * characters and/or adding new characters.
             *
             * @this {String}
             * @param {number} start Index at which to start changing the string.
             * @param {number} delCount An integer indicating the number of old chars to remove.
             * @param {string} newSubStr The String that is spliced in.
             * @return {string} A new string with the spliced substring.
             */
            String.prototype.splice = function(start, delCount, newSubStr = "") {
                return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
            };
        }

    }

    test() {
        console.log("test");
    }

    onKeyDown(e) {
        let text = this.state.text;
        if (e.keyCode >= 112 && e.keyCode <= 123)
            return;
        switch (e.key) {
            case "Control":
            case "Tab":
            case "Alt":
            case "CapsLock":
            case "Shift":
            case "ScrollLock":
            case "Pause":
            case "Meta":
            case "ContextMenu":
            case "PageUp":
            case "PageDown":
            case "Insert":
            case "Escape":
                break;
            case "Home":
                this.setState({cursorPosition: [this.state.cursorPosition[0], 0]});
                break;
            case "End":
                this.setState({cursorPosition: [this.state.cursorPosition[0], this.state.text[this.state.cursorPosition[0]].length]});
                break;
            case "ArrowUp":
                if (this.state.cursorPosition[0] > 0) {
                    let charPos = this.state.cursorPosition[1];
                    if (charPos > this.state.text[this.state.cursorPosition[0] - 1].length)
                        charPos = this.state.text[this.state.cursorPosition[0] - 1].length;
                    this.setState({cursorPosition: [this.state.cursorPosition[0] - 1, charPos]});
                }
                break;
            case "ArrowDown":
                console.log(this.state.text.length)
                if (this.state.cursorPosition[0] < this.state.text.length - 1) {
                    let charPos = this.state.cursorPosition[1];
                    if (charPos > this.state.text[this.state.cursorPosition[0]].length)
                        charPos = this.state.text[this.state.cursorPosition[0]].length
                    this.setState({cursorPosition: [this.state.cursorPosition[0] + 1, charPos]});
                }
                break;
            case "ArrowLeft":
                if (this.state.cursorPosition[1] > 0) {
                    this.setState({cursorPosition: [this.state.cursorPosition[0], this.state.cursorPosition[1] - 1]});
                } else if (this.state.cursorPosition[0] > 0){
                    let charPos = this.state.text[this.state.cursorPosition[0] - 1].length;
                    this.setState({cursorPosition: [this.state.cursorPosition[0] - 1, charPos]});
                }
                break;
            case "ArrowRight":
                if (this.state.cursorPosition[1] < this.state.text[this.state.cursorPosition[0]].length) {
                    this.setState({cursorPosition: [this.state.cursorPosition[0], this.state.cursorPosition[1] + 1]});
                } else if (this.state.cursorPosition[0] < this.state.text.length - 1) {
                    let charPos = 0;
                    this.setState({cursorPosition: [this.state.cursorPosition[0] + 1, charPos]});
                }
                break;
            case "Backspace":
                if (this.state.cursorPosition[1] > 0) {
                    this.setState({cursorPosition: [this.state.cursorPosition[0], this.state.cursorPosition[1] - 1]});
                    text[this.state.cursorPosition[0]] = text[this.state.cursorPosition[0]].splice(this.state.cursorPosition[1], 1);
                    this.setState({text: text});
                } else if (this.state.cursorPosition[0] > 0) {
                    let charPos = this.state.text[this.state.cursorPosition[0] - 1].length;
                    this.setState({cursorPosition: [this.state.cursorPosition[0] - 1, charPos]});
                    text[this.state.cursorPosition[0]] = text[this.state.cursorPosition[0]] + text[this.state.cursorPosition[0] + 1];
                    text.splice(this.state.cursorPosition[0] + 1, 1);
                    this.setState({text: text});
                }
                break;
            case "Delete":
                console.log(this.state.cursorPosition[1])
                console.log(this.state.text[this.state.cursorPosition[0]].length)
                if (this.state.text[this.state.cursorPosition[0]].length === this.state.cursorPosition[1] && this.state.cursorPosition[0] < this.state.text.length) {
                    text[this.state.cursorPosition[0]] = text[this.state.cursorPosition[0]] + text[this.state.cursorPosition[0] + 1];
                    text.splice(this.state.cursorPosition[0] + 1, 1);
                } else {
                    text[this.state.cursorPosition[0]] = text[this.state.cursorPosition[0]].splice(this.state.cursorPosition[1], 1);
                }
                this.setState({text: text});
                break;
            default:
                let char = e.key;
                let charPos = 0;
                let stringPos = 0;
                if (e.key === "Enter") {
                    char = "";
                    stringPos = this.state.cursorPosition[0] + 1;
                    let head = text[this.state.cursorPosition[0]].substr(0, this.state.cursorPosition[1]);
                    let tail = text[this.state.cursorPosition[0]].substr(this.state.cursorPosition[1], text[this.state.cursorPosition[0]].length);
                    text[this.state.cursorPosition[0]] = head;
                    text.splice(this.state.cursorPosition[0] + 1, 0, tail);
                } else {
                    charPos = this.state.cursorPosition[1] + 1;
                    stringPos = this.state.cursorPosition[0];
                }

                text[this.state.cursorPosition[0]] = text[this.state.cursorPosition[0]].splice(this.state.cursorPosition[1], 0, char);

                this.setState({text: text,
                    cursorPosition: [stringPos, charPos]});
                break;
        }
        console.log(this.state.cursorPosition)
        console.log(e.key);
    }

    setText(text) {
        this.setState({text: text});
    }

    render() {
        return (
            <div className="App">
                <EditSpace text={this.state.text} cursorPositon={this.state.cursorPosition}/>
                <div className="Controls">
                    <Download text={this.state.text}/>
                    <Upload text={this.state.text} setText={this.setText}/>
                </div>

            </div>
        );
    }
}

export default App;
