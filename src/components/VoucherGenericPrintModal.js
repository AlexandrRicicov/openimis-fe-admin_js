import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useModulesManager, useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../constants';

export const useStyles = makeStyles((theme) => ({
  primaryButton: { ...theme.dialog.primaryButton, padding: '6px 12px' },
  secondaryButton: theme.dialog.secondaryButton,
  item: theme.paper.item,
}));

function VoucherGenericPrintModal({ open, onClose, onConfirm }) {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);
  const [confirmPrint, setConfirmPrint] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>{formatMessage('VoucherGenericPrintModal.title')}</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <DialogContentText>{formatMessage('VoucherGenericPrintModal.description')}</DialogContentText>
          <FormControlLabel
            style={{ margin: '12px 0 0 0' }}
            control={
              <Checkbox color="primary" checked={confirmPrint} onChange={(e) => setConfirmPrint(e.target.checked)} />
            }
            label={formatMessage('VoucherGenericPrintModal.checkbox')}
          />
        </Grid>
      </DialogContent>
      <Divider style={{ margin: '12px 0' }} />
      <DialogActions>
        <Button onClick={onClose} className={classes.secondaryButton}>
          {formatMessage('close')}
        </Button>
        <Button onClick={onConfirm} autoFocus className={classes.primaryButton} disabled={!confirmPrint}>
          {formatMessage('VoucherGenericPrintModal.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VoucherGenericPrintModal;
