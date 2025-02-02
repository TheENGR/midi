import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Cog } from 'mdi-material-ui';

import Checkbox from '../mui/Checkbox';
import Dialog from '../mui/Dialog';
import IconButton from '../mui/IconButton';
import InstrumentSelect from '../InstrumentSelect';
import MasterVolumeSlider from '../MasterVolumeSlider';

const SettingsButton = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
      >
        <Cog style={{ color: props.colors.headerText }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Site Settings"
        content={
          <>
            <Checkbox
              id="checkbox-radio-option-one"
              checked={props.colorMode === 'dark'}
              onChange={e => {
                let mode = e.target.checked ? 'dark' : 'light';
                localStorage.setItem('colorMode', mode);
                props.dispatch({
                  type: 'setColorMode',
                  mode
                })
              }}
              label="Use Dark Mode"
            />
            <br />
            <InstrumentSelect />
            <MasterVolumeSlider />
          </>
        }
        onConfirm={() => setOpen(false)}
        confirmLabel="Done"
      />
    </>
  )
}

export default connect(state => ({
  colorMode: state.colorMode,
  colors: state.colors
}))(SettingsButton);
