import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';

const useStyles = makeStyles((theme) => ({
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
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '29px',
    textAlign: 'start',
  },
}));

function AdminAndInspectorDashboard() {
  const classes = useStyles();
  const { formatMessageWithValues } = useTranslations(MODULE_NAME);
  const { user } = useSelector((state) => state.core);

  return (
    <div className={classes.page}>
      <div className={classes.wrapper}>
        <Typography className={classes.pageTitle}>
          {formatMessageWithValues('AdminAndInspectorDashboard.title', {
            user: `${user.i_user.other_names} ${user.i_user.last_name}`,
          })}
        </Typography>
      </div>
    </div>
  );
}

export default AdminAndInspectorDashboard;
