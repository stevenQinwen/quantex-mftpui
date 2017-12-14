const api = 'qtw';
export default (t) => {
  return {
    secuName: (v) => { return t(v, api, '/api/v2/bond_infos/dict', 'secu_name'); },
    partyBasicInfo: (v) => { return t(v, api, '/api/v2/party_basicinfos/dict', 'party_basicinfo'); }
  };
};
