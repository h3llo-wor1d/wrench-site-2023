import Webamp from "webamp";
import {useState, useEffect} from 'react';

const config = {
  // Optional.
  initialTracks: [
    {
        metaData: {
            title: "Bangarang",
            artist: "Skrillex"
        },
        url: "assets/music/bangarang.flac"
    }
  ],
};


export default function WebAmpApplication() {
    const [divRef, setDivRef] = useState(null);

  useEffect(() => {
    if (divRef == null) {
      return;
    }
    const webamp = new Webamp({config});
    webamp.renderWhenReady(divRef);

    return () => {
      webamp.dispose();
    };
  }, [divRef]);

  // Check if Winamp is supported in this browser
  if (!Webamp.browserIsSupported()) {
    return <div>Not supported</div>;
  }

  return <div ref={setDivRef} />;
}