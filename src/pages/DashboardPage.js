import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslations } from '@openimis/fe-core';
import PeriodSelector from '../components/dashboard/PeriodSelector';
import Shortcuts from '../components/dashboard/Shortcuts';
import SystemData from '../components/dashboard/SystemData';
import { MODULE_NAME } from '../constants';
import { useSystemData } from '../hooks';
import { useFirstAndLastDayOfTheYear } from '../utils/dates';

export const useStyles = makeStyles((theme) => ({
  page: {
    ...theme.page,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    maxWidth: '1200px',
    width: '100%',
    padding: theme.spacing(1),
    gap: theme.spacing(2),
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '29px',
    textAlign: 'start',
  },
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    borderRadius: '10px',
    border: '1px solid #E0E0E0',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '24px',
    textAlign: 'start',
    width: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  cardSubtitle: {
    fontSize: '15px',
    fontWeight: '500',
    lineHeight: '20px',
  },
  cardCount: {
    fontSize: '48px',
    fontWeight: '600',
    lineHeight: '58px',
  },
  cardCountSecondary: {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '40px',
  },
  grid: {
    display: 'grid',
    gap: theme.spacing(2),
    width: '100%',
  },
  threeColumnGrid: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  twoColumnGrid: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

function DashboardPage() {
  const classes = useStyles();
  const { formatMessage, formatMessageWithValues } = useTranslations(MODULE_NAME);
  const { economicUnit } = useSelector((state) => state.policyHolder);
  const { user } = useSelector((state) => state.core);

  const { firstCalendarDay, lastCalendarDay } = useFirstAndLastDayOfTheYear();

  const [startDate, setStartDate] = useState(firstCalendarDay);
  const [endDate, setEndDate] = useState(lastCalendarDay);

  const { systemData, isLoading } = useSystemData(economicUnit, startDate, endDate);

  return (
    <div className={classes.page}>
      <div className={classes.wrapper}>
        <Typography className={classes.pageTitle}>
          {formatMessageWithValues('DashboardPage.title', {
            employer: <strong>{`${user.i_user.other_names} ${user.i_user.last_name}`}</strong>,
            economicUnit: <strong>{`${economicUnit.code} - ${economicUnit.tradeName}`}</strong>,
          })}
        </Typography>
        <div className={classes.card}>
          <div className={classes.cardTitle}>{formatMessage('DashboardPage.shortcuts')}</div>
          <Shortcuts />
        </div>
        <SystemData systemData={systemData} isLoading={isLoading} parentClasses={classes}>
          <div className={classes.cardTitle}>{formatMessage('DashboardPage.selectPeriod')}</div>
          <PeriodSelector
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
            isLoading={isLoading}
          />
        </SystemData>
      </div>
    </div>
  );
}

export default DashboardPage;
