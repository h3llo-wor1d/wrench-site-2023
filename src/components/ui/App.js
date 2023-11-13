import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { ReactDOM } from "react";
import Window from "./Window";

function useOutsideAlerter(ref, reset) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && ref) {
          reset()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, reset]);
}

  
export default function App(props) {
    const [counter, setCounter] = useState(0);
    const wrapperRef = useRef(null);
    const icon = useRef(null);
    const text = useRef(null);
    const [shouldRun, setShouldRun] = useState(true)

    const resetCounter = () => {
        setCounter(0);
        icon.current.className = "";
        text.current.className = "";
    }
    
    useOutsideAlerter(wrapperRef, resetCounter);

    const handleDelete = () => {
      setShouldRun(true)
    }

    useEffect(() => {
      if (props.details.settings.autoStart) {
          setShouldRun(false);
          let pre=window.openWindows;
          window.windows = [...window.windows, props.details.name]
          window.openWindows = [
            ...window.openWindows,
            <div id={props.details.name}>
              <Window 
                onDelete={handleDelete} 
                preState={pre} 
                setState={props.set} 
                details={props.details}
              />
            </div>
          ]
          props.set(window.openWindows);
      }
    }, [])
    
    const handle = () => {
        if (counter === 1) {
          resetCounter();
          if (shouldRun) {
            setShouldRun(false);
            let pre=window.openWindows;
            window.windows = [...window.windows, props.details.name]
            window.openWindows = [
              ...window.openWindows,
              <div id={props.details.name}>
                <Window 
                  onDelete={handleDelete} 
                  preState={pre} 
                  setState={props.set} 
                  details={props.details}
                />
              </div>
            ]
            props.set(window.openWindows);
          }
          return;
        };
        setCounter(counter+1);
        icon.current.className="imSelected"
        text.current.className="txSelected"
        
    }

    return (
      <div ref={wrapperRef} style={{textAlign: "center", width: "fit-content", fontSize: "8pt", backdropFilter: "blur(10px)"}} className="noselect" onClick={handle}>
          <div ref={icon} style={{
            backgroundImage: `url(./assets/icons/${props.icon}.png)`, 
            backgroundSize: "35px 35px", 
            height: "35px", 
            width: "35px", 
            position: "relative", 
            left: "50%", 
            transform: "translateX(-50%)"}} 
          />
          <p style={{fontFamily: "Pixelated MS Sans Serif", color: "white", marginTop: "3px"}} ref={text}>{props.name}</p>
      </div>  
    )
}