import { Component } from "react";
import Start from "./sub/start";
import TaskbarItem from "./sub/TaskbarItem";

export default class Taskbar extends Component {
    handleUiEvent = (element, details) => {
        return;
    }

    render() {
        return (
            <div 
                style={{
                    position: "fixed",
                    zIndex: 30000000,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "20px",
                }}
                className="window"
            >
                <div style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px"
                }}>
                    <Start uiEvent={this.handleUiEvent} />
                    <TaskbarItem />
                </div>
            </div>
        )
    }
}