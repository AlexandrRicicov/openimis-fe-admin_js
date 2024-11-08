import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useModulesManager, useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';
import FetchingCategory from './FetchingCategory';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: theme.spacing(3),
  },
  subcategoriesWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
    width: '100%',
  },
  categoryWrapper: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
  },
}));

function SystemData({
  parentClasses, systemData, isLoading, children,
}) {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);

  const { worker, voucher, payment } = systemData;

  return (
    <>
      <div className={`${parentClasses.grid} ${parentClasses.threeColumnGrid}`}>
        <div className={parentClasses.card}>
          <FetchingCategory isLoading={isLoading}>
            <div className={classes.wrapper}>
              <Typography className={parentClasses.cardTitle}>
                {formatMessage('SystemData.worker.totalNumber')}
              </Typography>
              <div className={classes.categoryWrapper}>
                <Typography className={parentClasses.cardCount}>{worker.totalNumber}</Typography>
              </div>
            </div>
          </FetchingCategory>
        </div>
        <div className={parentClasses.card}>
          <FetchingCategory isLoading={isLoading}>
            <div className={classes.wrapper}>
              <Typography className={parentClasses.cardTitle}>
                {formatMessage('SystemData.worker.activeNumber')}
              </Typography>
              <div className={classes.categoryWrapper}>
                <Typography className={parentClasses.cardCount}>{worker.activeNumber}</Typography>
              </div>
            </div>
          </FetchingCategory>
        </div>
        <div className={parentClasses.card}>
          <div className={classes.wrapper}>
            {children}
          </div>
        </div>
      </div>
      <div className={`${parentClasses.grid} ${parentClasses.twoColumnGrid}`}>
        <div className={parentClasses.card}>
          <FetchingCategory isLoading={isLoading}>
            <div className={classes.wrapper}>
              <Typography className={parentClasses.cardTitle}>{formatMessage('SystemData.voucher.title')}</Typography>
              <div className={classes.subcategoriesWrapper}>
                {Object.entries(voucher).map(([key, value]) => (
                  <div key={key}>
                    <Typography className={parentClasses.cardSubtitle}>
                      {formatMessage(`SystemData.voucher.${key}`)}
                    </Typography>
                    <Typography className={parentClasses.cardCountSecondary}>{value}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </FetchingCategory>
        </div>
        <div className={parentClasses.card}>
          <FetchingCategory isLoading={isLoading}>
            <div className={classes.wrapper}>
              <Typography className={parentClasses.cardTitle}>{formatMessage('SystemData.payment.title')}</Typography>
              <div className={classes.subcategoriesWrapper}>
                {Object.entries(payment).map(([key, value]) => (
                  <div key={key}>
                    <Typography className={parentClasses.cardSubtitle}>
                      {formatMessage(`SystemData.payment.${key}`)}
                    </Typography>
                    <Typography className={parentClasses.cardCountSecondary}>{value}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </FetchingCategory>
        </div>
      </div>
    </>
  );
}

export default SystemData;
