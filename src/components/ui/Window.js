import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import HtmlDocument from "../sub/HtmlDocument";
import TextDocument from "../sub/TextDocument";
import SpecialApplication from "../sub/SpecialApplication";
import MineSweeper from "../apps/Minesweeper";
import MinesweeperView from "../apps/Minesweeper/MinesweeperView";
import WebApp from "../sub/WebApp";

const defaultSizes = [
    [300,100],
    [700,500],
    [700, 500],
    [233, 343.8]
]
const specialApplications = [
    2
]
export default function Window(props) {
    const [body, setBody] = useState("");
    const [size, setSize] = useState(props.details.settings.defaultSize ? props.details.settings.defaultSize : defaultSizes[props.details.type]);
    const [sn, setSN] = useState(false);
    const [tc, setTC] = useState(0);
    const [pos, setPos] = useState({x: 0, y: 0});
    const isSpecial = specialApplications.indexOf(props.details.type) !== -1;

    useEffect(() => {
        switch(props.details.type) {
            case 1:
                setBody(<HtmlDocument src={props.details.content.src} width={"calc(100% - 10px)"} height={"calc(100% - 25px)"} />);
                break;
            case 0:
                setBody(<TextDocument innerHTML={props.details.content.innerHTML} />);
                break;
            case 3:
                setBody(<MineSweeper />);
                break;
            case 4:
                setBody(<WebApp mapUrl={props.details.content.mapUrl}/>);
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
        if (props.details.settings.resizable) {
            switch (sn) {
                case false:
                    setPos({x: 0, y: 0});
                    setSize(["100%", "100%"]);
                    break;
                default:
                    setSize(
                        props.details.settings.defaultSize ? 
                        props.details.settings.defaultSize : 
                        defaultSizes[props.details.type]
                    );
                    break;
            }
            setSN(!sn); 
        }
    }

    const handleStop = (e, dragE) => {
        setPos({x: dragE.x, y: dragE.y})
    }

    const focus = e => {
        return;
    }

    return (
        isSpecial ? <SpecialApplication details={props.details} onClose={() => {
            props.onDelete();
            
        }} /> :
        <Draggable handle="strong" cancel="bin" bounds={"body"} onDrag={() => setTC(0)} position={pos} onStop={handleStop} onClick={focus}>
            <div style={{ width: size[0], height: size[1], resize: props.details.settings.resizable && "both", overflow: "hidden"}} className="window">
                <strong>
                    <div className="title-bar pointerOnHover" onClick={addToTitleCounter}>
                        <div className="title-bar-text noselect">{props.details.name}</div>
                        <bin className="title-bar-controls">
                            <button aria-label="Minimize" />
                            <button aria-label="Maximize" onClick={max} />
                            <button aria-label="Close" onClick={() => {
                                props.onDelete();
                                document.dispatchEvent(new CustomEvent("win98Closed", {
                                    detail: props.details.name
                                }))
                                
                            }} />
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