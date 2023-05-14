import { useRef, useState } from "react";
import { useClickAnyWhere } from "usehooks-ts";

export default function Audio() {
  const [setup, setSetup] = useState(false);
  const tracksRef = useRef<HTMLAudioElement>(null);
  const jazzRef = useRef<HTMLAudioElement>(null);
  useClickAnyWhere(() => {
    if (setup) return;
    if (tracksRef.current && jazzRef.current) {
      setSetup(true);
      const jazz = jazzRef.current;
      const tracks = tracksRef.current;
      jazz.volume = 0.05;
      tracks.volume = 0.015;
      jazz.play();
      tracks.play();
    }
  });

  return (
    <>
      <audio ref={tracksRef} hidden preload="auto" loop src="/train.mp3" />
      <audio ref={jazzRef} hidden preload="auto" loop src="/jazz.mp3" />
    </>
  );
}
