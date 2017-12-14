import React from 'react';
import { Translate } from 'components';

const getTranslate = (props) => { return <Translate {...props} />; };
// t
const t = (value, transSite, transUrl, transKey, transParams, props) => {
  return getTranslate({ value, transSite, transUrl, transKey, transParams, ...props });
};

export default t;
