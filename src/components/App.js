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
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, reset]);
  }

  
export default function App(props) {
    const [counter, setCounter] = useState(0);
    const [icon, setIcon] = useState(`./assets/icons/${props.icon}.png`);
    const wrapperRef = useRef(null);
    const [shouldRun, setShouldRun] = useState(true)

    const resetCounter = () => {
        setCounter(0);
        setIcon(`./assets/icons/${props.icon}.png`);
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
            setShouldRun(false);
            let pre=window.openWindows;
            window.windows = [...window.windows, props.details.name]
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
          }
          return;
        };
        setCounter(counter+1);
        if (counter > 0) {
          console.log(counter)
          setIcon(`./assets/icons/${props.icon}_active.png`);
        }
        
    }

    return (
      <Draggable onDragStart={() => setCounter(counter-1)}>
        <div ref={wrapperRef} style={{textAlign: "center", width: "fit-content", fontSize: "8pt", backdropFilter: "blur(10px)"}} className="noselect" onClick={handle}>
            <div style={{backgroundImage: `url(${icon})`, backgroundSize: "35px 35px", height: "35px", width: "35px", position: "relative", left: "50%", transform: "translateX(-50%)"}} />
            <p style={{fontFamily: "Pixelated MS Sans Serif", color: "white", marginTop: "3px", background: counter===1 && "#000080"}}>{props.name}</p>
        </div>
      </Draggable>
        
    )
}