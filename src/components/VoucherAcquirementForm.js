import React, { useState } from 'react';

import {
  Divider, Grid, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
  useModulesManager, useTranslations, InfoButton,
} from '@openimis/fe-core';
import { ACQUIREMENT_METHOD, DEFAULT, MODULE_NAME } from '../constants';
import VoucherAcquirementGenericVoucher from './VoucherAcquirementGenericVoucher';
import VoucherAcquirementSpecificWorker from './VoucherAcquirementSpecificWorker';

export const useStyles = makeStyles((theme) => ({
  paper: { ...theme.paper.paper, margin: '10px 0 0 0' },
  paperHeaderTitle: {
    ...theme.paper.title,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableTitle: theme.table.title,
  item: theme.paper.item,
  infoSection: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

function VoucherAcquirementForm() {
  const modulesManager = useModulesManager();
  const classes = useStyles();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);
  const genericVoucherEnabled = modulesManager.getConf(
    'fe-worker_voucher',
    'genericVoucherEnabled',
    DEFAULT.GENERIC_VOUCHER_ENABLED,
  );
  // Always default to SPECIFIC_WORKER (Voucher Personal)
  const [acquirementMethod, setAcquirementMethod] = useState(ACQUIREMENT_METHOD.SPECIFIC_WORKER);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Grid container className={classes.paperHeaderTitle}>
                <div className={classes.infoSection}>
                  <InfoButton
                    content={formatMessage('VoucherAcquirementForm.form.moreInfo')}
                    iconSize="large"
                    maxWidth="large"
                  />
                  <Typography variant="h5">{formatMessage('workerVoucher.menu.voucherAcquirement')}</Typography>
                </div>
              </Grid>
            </Grid>
            <Divider />
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {acquirementMethod === ACQUIREMENT_METHOD.SPECIFIC_WORKER && (
              <VoucherAcquirementSpecificWorker />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default VoucherAcquirementForm;
