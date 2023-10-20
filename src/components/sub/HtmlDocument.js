import { useState } from "react"

export default function HtmlDocument(props) {
    const [index, setIndex] = useState(0);

    return (
        <iframe src={props.src} title="wrenchwebsite" style={{width: props.width, height: props.height }}/>
    )
}