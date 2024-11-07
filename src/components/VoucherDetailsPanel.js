import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import {
  Button, Divider, Grid, Typography,
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from '@material-ui/styles';

import {
  FormattedMessage, historyPush, useHistory, useModulesManager,
} from '@openimis/fe-core';
import { changeGenericVoucherStatusAfterPrint, fetchWorkerVoucher } from '../actions';
import {
  PRINTABLE, REF_ROUTE_BILL, VOUCHER_RIGHT_SEARCH, WORKER_VOUCHER_STATUS,
} from '../constants';
import { isTheVoucherExpired } from '../utils/utils';
import VoucherDetailsEmployer from './VoucherDetailsEmployer';
import VoucherDetailsPrintTemplate from './VoucherDetailsPrintTemplate';
import VoucherDetailsVoucher from './VoucherDetailsVoucher';
import VoucherDetailsWorker from './VoucherDetailsWorker';
import VoucherGenericPrintModal from './VoucherGenericPrintModal';

const useStyles = makeStyles((theme) => ({
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: '100%',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
  },
}));

function VoucherDetailsPanel({
  workerVoucher, readOnly = true, formatMessage, rights, logo, formatDateTimeFromISO,
}) {
  const modulesManager = useModulesManager();
  const history = useHistory();
  const dispatch = useDispatch();
  const voucherPrintTemplateRef = useRef(null);
  const classes = useStyles();
  const isAssignedStatus = workerVoucher.status === WORKER_VOUCHER_STATUS.ASSIGNED;
  const [isPrintConfirmationModalOpen, setIsPrintConfirmationModalOpen] = useState(false);

  const handlePrint = useReactToPrint({
    documentTitle: `${workerVoucher.code}`,
  });

  const redirectToTheLinkedBill = () => historyPush(modulesManager, history, REF_ROUTE_BILL, [workerVoucher.billId]);

  const openPrintConfirmationModal = () => setIsPrintConfirmationModalOpen(true);

  const closePrintConfirmationModal = () => setIsPrintConfirmationModalOpen(false);

  const onGenericVoucherPrint = () => {
    dispatch(changeGenericVoucherStatusAfterPrint(workerVoucher, 'Change Status After Print')).then(() => {
      closePrintConfirmationModal();
      dispatch(fetchWorkerVoucher(modulesManager, [`id: "${workerVoucher.uuid}"`]));
    });
    handlePrint(null, () => voucherPrintTemplateRef.current);
  };

  return (
    <div>
      <Grid container className={classes.tableTitle}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.fullHeight}
        >
          <Grid item>
            <Typography>
              <FormattedMessage module="workerVoucher" id="workerVoucher.VoucherDetailsPanel.subtitle" />
            </Typography>
          </Grid>
          {rights.includes(VOUCHER_RIGHT_SEARCH) && (
            <Grid item className={classes.actionButtons}>
              {PRINTABLE.includes(workerVoucher.status) && (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<PrintIcon />}
                  disabled={!workerVoucher.billId || isTheVoucherExpired(workerVoucher)}
                  onClick={(e) => {
                    e.preventDefault();

                    if (isAssignedStatus) {
                      handlePrint(null, () => voucherPrintTemplateRef.current);
                      return;
                    }

                    openPrintConfirmationModal();
                  }}
                >
                  <Typography variant="body2">{formatMessage('workerVoucher.printVoucher')}</Typography>
                </Button>
              )}
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={!workerVoucher.billId}
                startIcon={<ReceiptIcon />}
                onClick={redirectToTheLinkedBill}
              >
                <Typography variant="body2">{formatMessage('workerVoucher.navigateToTheBill.tooltip')}</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Divider />
      <VoucherDetailsVoucher
        workerVoucher={workerVoucher}
        readOnly={readOnly}
        classes={classes}
        formatMessage={formatMessage}
        formatDateTimeFromISO={formatDateTimeFromISO}
      />
      <VoucherDetailsWorker workerVoucher={workerVoucher} readOnly={readOnly} classes={classes} />
      <VoucherDetailsEmployer workerVoucher={workerVoucher} readOnly={readOnly} classes={classes} />
      <VoucherGenericPrintModal
        open={isPrintConfirmationModalOpen}
        onClose={closePrintConfirmationModal}
        onConfirm={onGenericVoucherPrint}
      />
      <div style={{ display: 'none' }}>
        <VoucherDetailsPrintTemplate
          ref={voucherPrintTemplateRef}
          logo={logo}
          workerVoucher={workerVoucher}
          isAssignedStatus={isAssignedStatus}
        />
      </div>
    </div>
  );
}

export default VoucherDetailsPanel;
