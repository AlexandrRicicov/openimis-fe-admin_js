/* eslint-disable import/prefer-default-export */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { fetchSystemData } from './actions';

export const useSystemData = (economicUnit, startDate, endDate) => {
  const dispatch = useDispatch();
  const prevEconomicUnitRef = useRef();
  const prevStartDateRef = useRef();
  const prevEndDateRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [systemData, setSystemData] = useState({
    worker: { totalNumber: 0, activeNumber: 0 },
    voucher: {
      pending: 0,
      unassigned: 0,
      assigned: 0,
      expired: 0,
      cancelled: 0,
    },
    payment: { paid: 0, unpaid: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const startDateISO = `${startDate}T00:00:00Z`;
        const endDateISO = `${endDate}T23:59:59Z`;

        const response = await dispatch(fetchSystemData(economicUnit, startDateISO, endDateISO));
        const payload = response.payload.data;

        setSystemData({
          worker: {
            totalNumber: payload.totalNumber.totalCount,
            activeNumber: payload.activeNumber.totalCount,
          },
          voucher: {
            pending: payload.pending.totalCount,
            unassigned: payload.unassigned.totalCount,
            assigned: payload.assigned.totalCount,
            expired: payload.expired.totalCount,
            cancelled: payload.cancelled.totalCount,
          },
          payment: {
            paid: payload.paid.totalCount,
            unpaid: payload.unpaid.totalCount,
          },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[USE_SYSTEM_DATA_HOOK]: Error fetching system data.', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      !_.isEqual(economicUnit, prevEconomicUnitRef.current)
      || startDate !== prevStartDateRef.current
      || endDate !== prevEndDateRef.current
    ) {
      fetchData();

      prevEconomicUnitRef.current = economicUnit;
      prevStartDateRef.current = startDate;
      prevEndDateRef.current = endDate;
    }
  }, [economicUnit, dispatch, startDate, endDate]);

  return { systemData, isLoading };
};
