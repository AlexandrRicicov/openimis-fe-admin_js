import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { PublishedComponent, useModulesManager, useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';
import { useFirstAndLastDayOfTheYear } from '../../utils/dates';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
}));

function PeriodSelector({
  startDate, endDate, setStartDate, setEndDate, isLoading,
}) {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);
  const { firstCalendarDay, lastCalendarDay } = useFirstAndLastDayOfTheYear();

  return (
    <div className={classes.wrapper}>
      <Grid item xs={12} className={classes.item}>
        <PublishedComponent
          pubRef="core.DatePicker"
          module="workerVoucher"
          label={formatMessage('workerVoucher.WorkerDateRangePicker.startDate')}
          value={startDate}
          onChange={(date) => (date ? setStartDate(date) : setStartDate(firstCalendarDay))}
          readOnly={isLoading}
          // NOTE: maxDate cannot be passed if endDate does not exist.
          // Passing any other falsy value will block months manipulation.
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(endDate ? { maxDate: endDate } : null)}
        />
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <PublishedComponent
          pubRef="core.DatePicker"
          module="workerVoucher"
          label={formatMessage('workerVoucher.WorkerDateRangePicker.endDate')}
          value={endDate}
          onChange={(date) => (date ? setEndDate(date) : setEndDate(lastCalendarDay))}
          readOnly={isLoading}
          // NOTE: minDate cannot be passed if startDate does not exist.
          // Passing any other falsy value will block months manipulation.
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(startDate ? { minDate: startDate } : null)}
        />
      </Grid>
    </div>
  );
}

export default PeriodSelector;
