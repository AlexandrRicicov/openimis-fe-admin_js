/* eslint-disable import/prefer-default-export */

import { useMemo } from 'react';

export const useFirstAndLastDayOfTheYear = () => {
  const dates = useMemo(() => {
    // NOTE: 'en-CA' gives 'YYYY-MM-DD' format
    const firstCalendarDay = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-CA');
    const lastCalendarDay = new Date(new Date().getFullYear(), 11, 31).toLocaleDateString('en-CA');
    return { firstCalendarDay, lastCalendarDay };
  }, []);

  return dates;
};
