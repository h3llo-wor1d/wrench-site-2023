import { useState } from "react";
import React, { useRef, useEffect } from "react";
import Window from "./Window";
import Draggable from "react-draggable";

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
    
    const handle = () => {
        if (counter === 1) {
          // run app
          resetCounter();
          if (shouldRun) {
            console.log('fuck!');
            try {
              setShouldRun(false);
              let pre=window.openWindows;
              window.windows = [...window.windows, props.details.name]
              console.log('...')
              window.openWindows = [
                ...window.openWindows,
                <Window 
                  del={props.createWindow} 
                  onDelete={handleDelete} 
                  preState={pre} 
                  setState={props.set} 
                  details={props.details}
                />
              ]
              
              
              props.set(window.openWindows);
              console.log(window.openWindows)
            } catch (err) {
              console.log(err)
            }
            
          }
          return;
        };
        setCounter(counter+1);
        console.log(counter)
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