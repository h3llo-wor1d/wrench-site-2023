export default function TextDocument(props) {
    return (
        <p style={{ textAlign: "center", whiteSpace: "pre-wrap" }}>{props.text}</p>
    )
}