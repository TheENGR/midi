import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import createNote from '../../../utilities/createNote';

const MidiManager = ({ dispatch }) => {
  useEffect(() => {
    const addNote = (midiNote, velocity) => {
      dispatch({
        type: 'addNote',
        note: createNote(midiNote, velocity)
      });
    }
  
    const removeNote = (midiNote) => {
      dispatch({
        type: 'removeNote',
        note: createNote(midiNote)
      });
    }

    const onMIDISuccess = (midiAccess) => {
      midiAccess.inputs.forEach(input => {
        input.onmidimessage = getMIDIMessage;
      })
    }
  
    const onMIDIFailure = () => {
      //TODO handle error
    }
  
    const getMIDIMessage = (message) => {
      const [command, note, velocity = 0] = message.data;
  
      switch (command) {
        case 176: //toggle sustain
          dispatch({ type: 'toggleSustain' });
          break;
        case 144: //noteOn
          if(velocity > 0)
            addNote(note, velocity);
          else
            removeNote(note);
          break;
        case 128: //noteOff
          removeNote(note);
          break;
        default:
          //TODO handle invalid command
      }
    }

    if(navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess).catch(onMIDIFailure);
    } else {
      //TODO handle bad browser
      console.log('WebMIDI is not supported in this browser.');
    }

    return () => {
      //TODO handle cleanup
    }
  }, [dispatch]);

  return (
    <></>
  )
}

export default connect(state => ({
  notes: state.notes
}))(MidiManager);
