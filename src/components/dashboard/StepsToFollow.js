import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useTranslations } from '@openimis/fe-core';
import { MODULE_NAME } from '../../constants';

export const useStyles = makeStyles((theme) => ({
  stepsToFollowTitle: {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '29px',
    marginBottom: '24px',
  },
  stepsToFollowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '32px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '22px',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  stepPrimary: {
    height: '116px',
    width: '257px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '22px',
  },
  stepSecondary: {
    height: '116px',
    width: '257px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '22px',
  },
}));

const STEPS_TO_FOLLOW = [
  {
    stepOrder: 1,
    title: 'workerVoucher.StepsToFollow.title.step1',
    description: 'workerVoucher.StepsToFollow.description.step1',
  },
  {
    stepOrder: 2,
    title: 'workerVoucher.StepsToFollow.title.step2',
    description: 'workerVoucher.StepsToFollow.description.step2',
  },
  {
    stepOrder: 3,
    title: 'workerVoucher.StepsToFollow.title.step3',
    description: 'workerVoucher.StepsToFollow.description.step3',
  },
  {
    stepOrder: 4,
    title: 'workerVoucher.StepsToFollow.title.step4',
    description: 'workerVoucher.StepsToFollow.description.step4',
    isSecondary: true,
  },
];

function Step({
  isSecondary = false, stepOrder, title, description,
}) {
  const classes = useStyles();
  const { formatMessage } = useTranslations(MODULE_NAME);

  return (
    <div className={classes.stepContainer}>
      <Typography className={classes.stepTitle}>{`${stepOrder}. ${formatMessage(title)}`}</Typography>
      <div className={isSecondary ? classes.stepSecondary : classes.stepPrimary}>{formatMessage(description)}</div>
    </div>
  );
}

function StepsToFollow() {
  const classes = useStyles();
  const { formatMessage } = useTranslations(MODULE_NAME);

  return (
    <div>
      <Typography className={classes.stepsToFollowTitle}>{formatMessage('DashboardPage.stepsToFollow')}</Typography>
      <div className={classes.stepsToFollowContainer}>
        {STEPS_TO_FOLLOW.map((step) => (
          <Step
            key={step.stepOrder}
            stepOrder={step.stepOrder}
            title={step.title}
            description={step.description}
            isSecondary={step.isSecondary}
          />
        ))}
      </div>
    </div>
  );
}

export default StepsToFollow;
