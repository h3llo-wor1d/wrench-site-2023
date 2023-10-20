import { Component, useEffect, useState } from "react";
import App from "../components/App";
import Window from "../components/Window";
import { Applications } from '../data/applications';

export default function Home(props) {
    const [windows, setWindows] = useState([]);
    const [apps, setApps] = useState([]);

    const getWindows = () => {
        return windows;
    }

    useEffect(() => {
        window.windows = [];
        window.openWindows=[];
        let appList = Applications.map(app => {
            return <App 
                name={app.name} 
                icon={app.icon}
                cur={windows}
                getCur={getWindows}
                set={setWindows}
                details={app}
            />
        });
        setApps(appList)
    }, [])

    return (
        <div>
            <div style={{height: "100vh", width: "100vw", position: "fixed", marginLeft: "10px", display: "flex", flexDirection: "row", rowGap: "20px", columnGap: "20px"}}>
                {apps}
            </div> 
            <div style={{height: "100vh", width: "100vw"}}>
                {windows} 
            </div>                 
        </div>
    )
    
}