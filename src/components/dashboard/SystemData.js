import React from 'react';

import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';

const useStyles = makeStyles(() => ({
  dataTitle: {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '29px',
    marginBottom: '12px',
  },
  dataSubtitle: {
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '22px',
  },
  dataCount: {
    fontSize: '48px',
    fontWeight: '600',
    lineHeight: '58px',
  },
  workerDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '128px',
  },
  voucherDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  paymentDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  withSubtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '64px',
  },
}));

function SystemData({ systemData, isLoading }) {
  const classes = useStyles();
  const { formatMessage } = useTranslations(MODULE_NAME);

  if (isLoading) {
    return <CircularProgress />;
  }

  const { worker, voucher, payment } = systemData;

  return (
    <>
      <div className={classes.workerDataContainer}>
        {Object.entries(worker).map(([key, value]) => (
          <div key={key}>
            <Typography className={classes.dataTitle}>{formatMessage(`SystemData.worker.${key}`)}</Typography>
            <Typography className={classes.dataCount}>{value}</Typography>
          </div>
        ))}
      </div>
      <div className={classes.voucherDataContainer}>
        <div>
          <Typography className={classes.dataTitle}>{formatMessage('SystemData.voucher.title')}</Typography>
          <div className={classes.withSubtitleContainer}>
            {Object.entries(voucher).map(([key, value]) => (
              <div key={key}>
                <Typography className={classes.dataSubtitle}>{formatMessage(`SystemData.voucher.${key}`)}</Typography>
                <Typography className={classes.dataCount}>{value}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.paymentDataContainer}>
        <div>
          <Typography className={classes.dataTitle}>{formatMessage('SystemData.payment.title')}</Typography>
          <div className={classes.withSubtitleContainer}>
            {Object.entries(payment).map(([key, value]) => (
              <div key={key}>
                <Typography className={classes.dataSubtitle}>{formatMessage(`SystemData.payment.${key}`)}</Typography>
                <Typography className={classes.dataCount}>{value}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SystemData;
