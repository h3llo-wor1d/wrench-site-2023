export default function Test(props) {
    
    const closenotif = () => document.getElementById("notif").remove()
 
return (
    <div id="notif">
        <button onClick={closenotif}> close </button>
    </div> 
)
}
