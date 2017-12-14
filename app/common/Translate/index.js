import { Translate } from 'components';
import t from './util';
import authTranslateFormatter from './auth';
import qtwTranslateFormatter from './qtw';
import qawTranslateFormatter from './qaw';

const makeT = (props) => {
  return (value, transSite, transUrl, transKey, transParams) => {
    return t(value, transSite, transUrl, transKey, transParams, props);
  };
};

const makeAttributions = (T) => {
  return Object.assign(
    {
      t: T,
      static: (v, key) => { return T(v, 'auth', '/api/v2/dictdatas/dict', key); }
    },
    authTranslateFormatter(T),
    qtwTranslateFormatter(T),
    qawTranslateFormatter(T)
  );
};

// initTranslateWrapper
const initTranslateWrapper = () => {
  const mt = makeT({ multiple: true });
  Object.assign(Translate,
    makeAttributions(t),
    {
      multiple: makeAttributions(mt)
    }
  );
};

export default initTranslateWrapper;
