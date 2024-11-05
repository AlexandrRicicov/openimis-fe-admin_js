import React from 'react';

import { Button, Tooltip } from '@material-ui/core';

import { useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../constants';
import mPassLogo from '../assets/mPassLogo.png';

function MPassLoginButton({ onClick }) {
  const { formatMessage } = useTranslations(MODULE_NAME);

  return (
    <Tooltip title={formatMessage('MPassLoginButton.tooltip')}>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        type="submit"
        onClick={onClick}
        style={{ padding: '12px 0' }}
      >
        <img src={mPassLogo} alt="Logo of Ministry" style={{ height: '52px', width: '167px' }} />
      </Button>
    </Tooltip>
  );
}

export default MPassLoginButton;
