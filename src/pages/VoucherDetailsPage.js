import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import {
  Form, Helmet, useHistory, useModulesManager, useTranslations, useToast,
} from '@openimis/fe-core';
import { clearWorkerVoucher, fetchWorkerVoucher, updateWorkerVoucher } from '../actions';
import { EMPTY_STRING, MODULE_NAME, VOUCHER_RIGHT_SEARCH, VOUCHER_RIGHT_UPDATE } from '../constants';
import VoucherDetailsPanel from '../components/VoucherDetailsPanel';
import { getLastMutationLog } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  page: theme.page,
}));

function VoucherDetailsPage({ match, logo }) {
  const prevSubmittingMutationRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const modulesManager = useModulesManager();
  const history = useHistory();
  const { showSuccess, showError } = useToast();
  const { formatMessage, formatMessageWithValues, formatDateTimeFromISO } = useTranslations(
    MODULE_NAME,
    modulesManager,
  );
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);
  const workerVoucherUuid = match?.params?.voucher_uuid;
  const { workerVoucher, fetchingWorkerVoucher, errorWorkerVoucher, mutation, submittingMutation } = useSelector((state) => state.workerVoucher);
  const [edited, setEdited] = useState(workerVoucher || {});
  const [reset, setReset] = useState(0);

  const titleParams = (workerVoucher) => ({
    code: workerVoucher?.code ?? EMPTY_STRING,
  });

  const canSave = () => !!edited && !!(edited.uuid || edited.id);

  const saveVoucher = () => {
    if (canSave()) {
      dispatch(updateWorkerVoucher(edited, 'Update Worker Voucher'));
    }
  };

  useEffect(() => {
    try {
      if (workerVoucherUuid) {
        const params = [`id: "${workerVoucherUuid}"`];
        dispatch(fetchWorkerVoucher(modulesManager, params));
      }
    } catch (error) {
      throw new Error(`[VOUCHER_DETAILS_PAGE]: Fetching worker voucher failed. ${error}`);
    }

    return () => dispatch(clearWorkerVoucher());
  }, [workerVoucherUuid]);

  useEffect(() => {
    if (workerVoucher) {
      setEdited(workerVoucher);
    }
  }, [workerVoucher]);

  useEffect(async () => {
    if (prevSubmittingMutationRef.current && !submittingMutation) {
      const mutationLog = await getLastMutationLog(dispatch, mutation?.clientMutationId || EMPTY_STRING);

      if (mutationLog?.error) {
        showError(formatMessage('workerVoucher.saveVoucher.error'));
        setReset((prevReset) => prevReset + 1);
        return;
      }

      showSuccess(formatMessage('workerVoucher.saveVoucher.success'));
      // Refresh voucher data after successful update
      if (workerVoucherUuid) {
        const params = [`id: "${workerVoucherUuid}"`];
        dispatch(fetchWorkerVoucher(modulesManager, params));
      }
    }
  }, [submittingMutation, mutation, workerVoucherUuid]);

  useEffect(() => {
    prevSubmittingMutationRef.current = submittingMutation;
  });

  return (
    rights.includes(VOUCHER_RIGHT_SEARCH) && (
      <div className={classes.page}>
        <Helmet title={formatMessageWithValues('workerVoucher.VoucherDetailsPage.title', titleParams(workerVoucher))} />
        <Form
          module="workerVoucher"
          title={formatMessageWithValues('workerVoucher.VoucherDetailsPage.title', titleParams(workerVoucher))}
          titleParams={titleParams(workerVoucher)}
          edited={edited}
          onEditedChanged={setEdited}
          canSave={canSave}
          save={saveVoucher}
          reset={reset}
          openDirty={!edited?.uuid}
          workerVoucher={workerVoucher}
          fetchingWorkerVoucher={fetchingWorkerVoucher}
          errorWorkerVoucher={errorWorkerVoucher}
          back={() => history.goBack()}
          HeadPanel={VoucherDetailsPanel}
          logo={logo}
          formatMessage={formatMessage}
          formatDateTimeFromISO={formatDateTimeFromISO}
          rights={rights}
          canSaveVoucher={canSave}
          saveVoucher={saveVoucher}
          enableActionButtons
        />
      </div>
    )
  );
}

export default VoucherDetailsPage;
