export default function TextDocument(props) {
    return (
        <p style={{ textAlign: "center", whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{__html: props.innerHTML}}></p>
    )
}