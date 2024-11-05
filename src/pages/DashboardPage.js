import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslations } from '@openimis/fe-core';
import StepsToFollow from '../components/dashboard/StepsToFollow';
import SystemData from '../components/dashboard/SystemData';
import { MODULE_NAME } from '../constants';
import { useSystemData } from '../hooks';

export const useStyles = makeStyles((theme) => ({
  page: {
    ...theme.page,
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    padding: '24px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '29px',
  },
}));

function DashboardPage() {
  const classes = useStyles();
  const { formatMessageWithValues } = useTranslations(MODULE_NAME);
  const { economicUnit } = useSelector((state) => state.policyHolder);
  const { user } = useSelector((state) => state.core);

  const { systemData, isLoading } = useSystemData(economicUnit);

  return (
    <div className={classes.page}>
      <Typography className={classes.pageTitle}>
        {formatMessageWithValues('DashboardPage.title', {
          employer: <strong>{`${user.i_user.other_names} ${user.i_user.last_name}`}</strong>,
          economicUnit: <strong>{`${economicUnit.code} - ${economicUnit.tradeName}`}</strong>,
        })}
      </Typography>
      <StepsToFollow />
      <SystemData systemData={systemData} isLoading={isLoading} />
    </div>
  );
}

export default DashboardPage;
