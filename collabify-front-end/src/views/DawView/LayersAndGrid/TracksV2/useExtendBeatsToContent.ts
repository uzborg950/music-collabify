import { useEffect } from "react";
import { secondsToBeats } from "../../utils/playUtils";
import { setNumBeats } from "../../../../redux/playback/playbackSlice";
import { TrackFileData } from "../../types/trackTypes";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

/*
Increases num of beats so that as a transitive effect, the track grid resizes to fit the new number of beats.
Right now this only takes TrackFileData as input. Later it should adapt to TrackSynths too.
 */
export const useExtendBeatsToContent = (trackDataList: TrackFileData[]) => {
  const bpm = useAppSelector((state) => state.playback.bpm);
  const nBeats = useAppSelector((state) => state.playback.nBeats);
  const dispatch = useAppDispatch();
  useEffect(() => {
    /*
    Sets the nBeats state (to increase track grid size) when data is loaded having greater number of beats
     */
    const maxBeats = trackDataList.reduce((maxBeat, trackData) => {
      const beats = secondsToBeats({ bpm, seconds: trackData.length });
      if (trackData.startBeat + beats > maxBeat)
        return trackData.startBeat + beats;
      return maxBeat;
    }, 0);

    if (maxBeats > nBeats) {
      dispatch(setNumBeats(maxBeats + (maxBeats % 4) + 16)); //resize to size of track of max length + remaining beats to complete the bar + 2 bars extra
    }
  }, [trackDataList, nBeats, dispatch, bpm]);
};
