import Slider from '@material-ui/core/Slider';
import SpeedIcon from '@material-ui/icons/Speed';
import { debounce, updateLSVoice } from 'helper';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVoiceItem } from 'redux/slices/voice.slice';
import useStyle from './style';
import useSpeaker from 'hooks/useSpeaker';
import { onTextToSpeech } from 'helper/speaker.helper';

let debounceTimer = null;

function VoiceSpeed() {
  const classes = useStyle();
  const { voice, speed, volume } = useSpeaker();
  const dispatch = useDispatch();
  const defaultSpeed = useRef(speed); // Fix error component is changing the controlled value

  const onSpeedChange = (value) => {
    if (value > 2 || value < 0.7) return;

    debounceTimer = debounce(debounceTimer, () => {
      onTextToSpeech(
        `Here is the voice read at speed: ${value}`,
        voice,
        value,
        volume,
      );
      dispatch(setVoiceItem({ key: 'speed', value }));
      updateLSVoice('speed', value);
    });
  };

  return (
    <div className="flex-center-between flex-grow-1">
      <SpeedIcon className={classes.icon} />

      <Slider
        classes={{
          root: classes.slider,
          thumb: classes.thumbSlider,
          rail: classes.railSlider,
          track: classes.trackSlider,
        }}
        defaultValue={defaultSpeed.current}
        min={0.7}
        max={2}
        step={0.1}
        onChange={(e, value) => onSpeedChange(value)}
      />
      <span className={classes.valueText}>{speed}</span>
    </div>
  );
}

export default VoiceSpeed;
