import { useState } from "react"

export default function Start(props) {
    const [active, setActive] = useState(false);

    return (
        <img src={`assets/ui/${active ? "start_active" : "start"}.png`} alt="startButton" height="20px" width="53px" className="disableDrag" onClick={() => {
            setActive(!active)
            props.uiEvent("start", {
                value: active
            })
        }}/>
    )
}