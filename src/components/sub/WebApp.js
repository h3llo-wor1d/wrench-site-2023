export default function WebApp(props) {
    const mapUrl = props.mapUrl.split(".");
    console.log(require(`../../data/${mapUrl[0]}/${mapUrl[1]}`).x);
    
    return <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{__html: require(`../../data/${mapUrl[0]}/${mapUrl[1]}`).x}}></div>
}