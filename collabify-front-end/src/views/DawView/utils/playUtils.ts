export const secondsToBeats = ({
  bpm,
  seconds,
}: {
  bpm: number;
  seconds: number;
}) => seconds / (60 / bpm);

export const beatsToSeconds = ({
  bpm,
  beats,
}: {
  bpm: number;
  beats: number;
}) => beats / (bpm / 60);
