import { useEffect, useRef } from "react";
import Webamp from "webamp";
import { initialTracks } from "../../../data/initialTracks";

export default function Winamp(props) {
    const ref = useRef(null);
    const webamp = useRef(null);
    useEffect(() => {
        const target = ref.current;
        if (!target) {
          return;
        }
        webamp.current = new Webamp({
          initialTracks,
        });
        webamp.current.renderWhenReady(target).then(() => {
          target.appendChild(document.querySelector('#webamp'));
        });
      }, []);
      useEffect(() => {
        if (webamp.current) {
          webamp.current.onClose(() => props.onClose());
          //webamp.current.onMinimize(onMinimize);
        }
      });

  // Check if Winamp is supported in this browser
  if (!Webamp.browserIsSupported()) {
    return <div>Not supported</div>;
  }

  return <div ref={ref}></div>
}