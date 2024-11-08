import React from 'react';
import { CircularProgress } from '@material-ui/core';

function FetchingCategory({ isLoading, children }) {
  if (isLoading) {
    return <CircularProgress />;
  }

  return children;
}

export default FetchingCategory;
