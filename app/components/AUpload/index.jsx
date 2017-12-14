import Upload from '../Upload';
import authorityButtonWrapper from '../_util/authorityButtonWrapper';

const Dragger = Upload.Dragger;

const AUpload = authorityButtonWrapper(Upload);
const ADragger = authorityButtonWrapper(Dragger);

AUpload.ADragger = ADragger;

export default AUpload;
