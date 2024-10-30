import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../constants';

export const useStyles = makeStyles((theme) => ({
  page: theme.page,
  pageTitle: {
    fontWeight: 600,
  },
}));

function DashboardPage() {
  const classes = useStyles();
  const { formatMessageWithValues } = useTranslations(MODULE_NAME);
  const { economicUnit } = useSelector((state) => state.policyHolder);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Refetch data when EU changes');
  }, [economicUnit]);

  return (
    <div className={classes.page}>
      <Typography variant="h5" className={classes.pageTitle}>
        {formatMessageWithValues('DashboardPage.title', {
          employer: 'Employer',
        })}
      </Typography>
    </div>
  );
}

export default DashboardPage;
