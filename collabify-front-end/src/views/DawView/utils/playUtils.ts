export const secondsToBeats = ({ bpm, seconds }: { bpm: number; seconds: number }) =>
  seconds / (60 / bpm);
