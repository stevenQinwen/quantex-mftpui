import Upload from './Upload';

class DraggerComponent extends Upload {

}

DraggerComponent.defaultProps = {
  ...Upload.defaultProps,
  type: 'drag'
};

export default DraggerComponent;
