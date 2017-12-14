const api = 'auth';
export default (t) => {
  return {
    userName: (v) => { return t(v, api, '/api/v2/users/dict', 'id_name'); },
    settlementzSpeed: (v) => { return t(v, api, '/api/v2/dictdatas/dict', 'settlement_speed'); },
    yesNotApply: (v) => { return t(v, api, '/api/v2/dictdatas/dict', 'yes_no_notapply'); }
  };
};
