import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ReactDOM from 'react-dom/client';
import HtmlDocument from "./sub/HtmlDocument";
import TextDocument from "./sub/TextDocument";
import WebAmpApplication from "./sub/WebAmpApplication";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const defaultSizes = [
    [300,100],
    [700,500],
    [700, 500]
]
export default function Window(props) {
    const [body, setBody] = useState("");
    const [size, setSize] = useState(defaultSizes[props.details.type]);
    const [sn, setSN] = useState(false);
    const [tc, setTC] = useState(0);
    const isWinAmp = props.details.type === 2;

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
        switch(props.details.type) {
            case 1:
                setBody(<HtmlDocument src={props.details.content.src} width={"calc(100% - 10px)"} height={"calc(100% - 25px)"} />);
                break;
            case 0:
                setBody(<TextDocument text={props.details.content.text} />);
                break;
            default:
                break;
        }
    }, [])

    const addToTitleCounter = () => {
        if (tc === 1) {
            setTC(0);
            max();
            return;
        }
        setTC(tc+1);
    }

    const max = () => {
        switch (sn) {
            case false:
                setSize(["100%", "100%"]);
                break;
            default:
                setSize(defaultSizes[props.details.type]);
                break;
        }
        setSN(!sn); 
    }

    return (
        isWinAmp ? <WebAmpApplication /> :
        <Draggable handle="strong" cancel="bin" bounds={"body"} onDrag={() => setTC(0)}>
            <div style={{ width: size[0], height: size[1], resize: "both", overflow: "hidden"}} className="window">
                <strong>
                    <div className="title-bar pointerOnHover" onClick={addToTitleCounter}>
                        <div className="title-bar-text noselect">{props.details.name}</div>
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