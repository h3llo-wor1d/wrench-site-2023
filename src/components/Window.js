import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ReactDOM from 'react-dom/client';
import HtmlDocument from "./sub/HtmlDocument";
import TextDocument from "./sub/TextDocument";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const defaultSizes = [
    [300,100],
    [700,500]
]
export default function Window(props) {
    const [body, setBody] = useState("");
    const [size, setSize] = useState(defaultSizes[props.details.type]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const del = () => {
        props.onDelete()
        let curIndex = window.windows.indexOf(props.details.name);
        let nWindows = window.openWindows.filter(k => k !== window.openWindows[curIndex]);
        let nWindowWindows = window.windows.filter(k => k !== props.details.name);
        window.openWindows = nWindows;
        window.windows = nWindowWindows;
        
        props.setState(nWindows);
    }

    useEffect(() => {
        console.log(props.details.type)
        switch(props.details.type) {
            case 1:
                setBody(<HtmlDocument src={props.details.content.src} width={"calc(100% - 5px)"} height={475} />);
                break;
            case 0:
                setBody(<TextDocument text={props.details.content.text} />);
                break;
            default:
                break;
        }
    }, [])

    const max = () => {
        setSize([800, 500]);
    }

    return (
        <Draggable handle="strong" cancel="bin">
            <div style={{ minWidth: size[0], width: size[0], minHeight:size[1], height: size[1]}} className="window">
                <strong>
                    <div className="title-bar pointerOnHover">
                        <div className="title-bar-text">{props.details.name}</div>
                        <bin className="title-bar-controls">
                            <button aria-label="Minimize" />
                            <button aria-label="Maximize" onClick={max} />
                            <button aria-label="Close" onClick={del} />
                        </bin>
                    </div>
                </strong>

                <div className="window-body" style={{padding: 0, margin: 0, height: "100%"}}>
                    {body}
                </div>
            </div>
        </Draggable>
    )
}