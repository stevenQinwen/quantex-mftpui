const api = 'qaw';
export default (t) => {
  return {
    fundsName: (v) => { return t(v, api, '/api/v2/funds/dict', 'code_name'); },
    strategiesName: (v) => { return t(v, api, '/api/v2/strategies/dict', 'code_name'); }
  };
};
