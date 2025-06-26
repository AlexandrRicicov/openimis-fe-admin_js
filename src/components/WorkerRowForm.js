import React from 'react';
import { Grid, TextField, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0),
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
    },
    headerRow: {
        backgroundColor: theme.palette.grey[100],
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
    fieldContainer: {
        padding: theme.spacing(0.5),
    },
}));

function WorkerRowForm({
    worker,
    workerData,
    onWorkerDataChange,
    readOnly = false,
    formatMessage,
}) {
    const classes = useStyles();

    const handleFieldChange = (field, value) => {
        onWorkerDataChange(worker.uuid, {
            ...workerData,
            [field]: value,
        });
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.headerRow}>
                <Typography variant="subtitle1">
                    {`${worker.lastName} ${worker.otherNames} (${worker.chfId})`}
                </Typography>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={2} className={classes.fieldContainer}>
                    <TextField
                        label={formatMessage('workerVoucher.workerRow.nameSurname')}
                        value={`${worker.lastName} ${worker.otherNames}`}
                        disabled
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid item xs={2} className={classes.fieldContainer}>
                    <TextField
                        label={formatMessage('workerVoucher.workerRow.startTime')}
                        type="time"
                        value={workerData?.startTime || '07:00'}
                        onChange={(e) => handleFieldChange('startTime', e.target.value)}
                        disabled={readOnly}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={3} className={classes.fieldContainer}>
                    <TextField
                        label={formatMessage('workerVoucher.workerRow.activityLocation')}
                        value={workerData?.workPlace || ''}
                        onChange={(e) => handleFieldChange('workPlace', e.target.value)}
                        disabled={readOnly}
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder={formatMessage('workerVoucher.workerRow.activityLocation.placeholder')}
                    />
                </Grid>

                <Grid item xs={3} className={classes.fieldContainer}>
                    <TextField
                        label={formatMessage('workerVoucher.workerRow.activityName')}
                        value={workerData?.activity || ''}
                        onChange={(e) => handleFieldChange('activity', e.target.value)}
                        disabled={readOnly}
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder={formatMessage('workerVoucher.workerRow.activityName.placeholder')}
                    />
                </Grid>

                <Grid item xs={2} className={classes.fieldContainer}>
                    <TextField
                        label={formatMessage('workerVoucher.workerRow.negotiatedPayment')}
                        type="number"
                        value={workerData?.negotiated || ''}
                        onChange={(e) => handleFieldChange('negotiated', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="0.00"
                        inputProps={{
                            step: "0.01",
                            min: "0"
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default WorkerRowForm; 
