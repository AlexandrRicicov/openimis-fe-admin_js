import React from 'react';

import { Grid, Divider } from '@material-ui/core';

import { PublishedComponent, TextInput } from '@openimis/fe-core';
import WorkerVoucherStatusPicker from '../pickers/WorkerVoucherStatusPicker';
import VoucherQRCode from './VoucherQRCode';
import { trimDate } from '../utils/utils';

function VoucherDetailsVoucher({
  workerVoucher, classes, readOnly, formatMessage, formatDateTimeFromISO,
}) {
  return (
    <>
      <Grid container style={{ marginTop: '12px' }}>
        <Grid xs={3}>
          <VoucherQRCode voucher={workerVoucher} />
        </Grid>
        <Grid container xs={9}>
          <Grid item xs={4} className={classes.item}>
            <TextInput
              module="workerVoucher"
              label="workerVoucher.code"
              value={workerVoucher?.code}
              readOnly={readOnly}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <WorkerVoucherStatusPicker
              nullLabel={formatMessage('workerVoucher.placeholder.any')}
              withLabel
              value={workerVoucher?.status}
              readOnly={readOnly}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="core.DatePicker"
              module="workerVoucher"
              label="workerVoucher.assignedDate"
              value={trimDate(workerVoucher?.assignedDate)}
              readOnly={readOnly}
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="core.DatePicker"
              module="workerVoucher"
              label="workerVoucher.dateOfAssignment"
              value={formatDateTimeFromISO(workerVoucher?.dateOfAssignment)}
              readOnly={readOnly}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="core.DatePicker"
              module="workerVoucher"
              label="workerVoucher.createdDate"
              value={formatDateTimeFromISO(workerVoucher?.dateCreated)}
              readOnly={readOnly}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <PublishedComponent
              pubRef="core.DatePicker"
              module="workerVoucher"
              label="workerVoucher.expiryDate"
              value={trimDate(workerVoucher?.expiryDate)}
              readOnly={readOnly}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{ margin: '12px 0' }} />
    </>
  );
}

export default VoucherDetailsVoucher;
