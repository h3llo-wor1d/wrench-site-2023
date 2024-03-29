import { Component, useEffect, useRef, useState } from "react";
import App from "../components/ui/App";
import Window from "../components/ui/Window";
import { Applications } from '../data/applications';
import Taskbar from "../components/ui/Taskbar";

export default function Home(props) {
    const [windows, setWindows] = useState([]);
    const [apps, setApps] = useState([]);
    const windowRef = useRef(null);

    const getWindows = () => {
        return windows;
    }

    useEffect(() => {
        document.addEventListener("win98Closed", e => {
            console.log(e.detail)
            document.getElementById(e.detail).remove()
        })

        document.addEventListener("testEvent", e => {
            if (Object.keys(window.dropdowns).indexOf(e.detail) === -1) {
                window.dropdowns[e.detail] = false;
            }
            window.dropdowns[e.detail] = !window.dropdowns[e.detail];
            document.getElementById(`uiarrow-${e.detail}`).style.transform = window.dropdowns[e.detail] ? "rotate(270deg) translateY(-50%)" : "translateY(-50%)";
            console.log(`uiarrow-${e.detail}`)
            document.getElementById(e.detail).style.height = window.dropdowns[e.detail] ? "fit-content" : "0";
            document.getElementById(e.detail).style.display = window.dropdowns[e.detail] ? "block" : "none";
        })

        window.testevent = () => {
            document.dispatchEvent(new CustomEvent('testEvent', {detail: 'testing!'}));
        }
        window.windows = [];
        window.openWindows=[];
        window.dropdowns = {};
        let appList = Applications.map(app => {
            return <App 
                name={app.name} 
                icon={app.icon}
                cur={windows}
                getCur={getWindows}
                set={setWindows}
                details={app}
                ref={windowRef}
            />
        });
        setApps(appList)
    }, [])

    return (
        <div>
            <div 
            id="apps"
            style={{height: "100vh", width: "100vw", position: "fixed", marginLeft: "10px", display: "flex", flexDirection: "row", rowGap: "20px", columnGap: "20px"}}>
                {apps}
            </div> 
            <div style={{height: "100vh", width: "100vw"}} ref={windowRef} id="windows">
                {windows} 
            </div>
            <Taskbar />                 
        </div>
    )
    
}