import { useEffect, useState } from "react";

type Metadata = {
  lengthSeconds: number;
  audioUri: string;
};
export const useMediaRecord = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recordMetadata, setRecordMetadata] = useState<Metadata>();
  useEffect(() => {
    if (mediaRecorder) return; //fail early if stream already userMedia already created
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia is not supported ");
      return;
    }
    console.log("getUserMedia supported");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setMediaRecorder(new MediaRecorder(stream));
      })
      .catch((err) => {
        console.log(`Error in generating getUserMedia ${err}`);
      });
  }, []);

  const startRecording = () => {
    if (!mediaRecorder) {
      console.log("mediaRecorder not initialized: cannot start recording");
      return;
    }

    console.log("Recording started");
    setRecordMetadata(undefined);
    let startTime = 0;
    let endTime = 0;
    mediaRecorder.start();
    mediaRecorder.onstart = () => {
      startTime = Date.now();
    };
    console.log(`mediaRecorder state: ${mediaRecorder.state}`);

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (blobEvent) => {
      chunks.push(blobEvent.data);
    };

    //Add evt listener mediaRecorder onStop to save blob to disk
    mediaRecorder.onstop = (event) => {
      endTime = Date.now();
      const lengthSeconds = (endTime - startTime) / 1000;
      console.log("saving blob chunks");
      const blob = new Blob(chunks, { type: "audio/mpeg; codecs=mp3" });
      const audioUrl = URL.createObjectURL(blob);
      console.log(`blob url is: ${audioUrl}`);
      setRecordMetadata({ lengthSeconds, audioUri: audioUrl });
    };
  };

  const stopRecording = () => {
    if (!mediaRecorder) {
      console.log("mediaRecorder not initialized: cannot stop recording");
      return;
    }
    console.log("recording stopped");
    mediaRecorder.stop();
    console.log(`mediaRecorder state: ${mediaRecorder.state}`);
  };

  // const stopRecording = () => {
  //   if (stream) {
  //     stream.getTracks().forEach((track) => track.stop());
  //   }
  //   setIsRecording(false);
  //   clearInterval(timerInterval!);
  //   socket.current?.emit("stop-transcript", { roomId: props.roomId });
  //   console.log("Recording stopped");
  // };

  //recordMetadata is populated when audio blob has saved
  return { startRecording, stopRecording, recordMetadata };
};
