import React from 'react';

class Content2Component extends React.Component {
  render() {
    console.log('render content2 done');
    return (
      <div className="content">
        <h1>Content2</h1>
        <p>Spectacles 是一个拍摄设备，同时它也是一副太阳眼镜，当要把眼镜与 Snapchat app 连接时，你不需要通过数据线连接，也不用眼镜取下来和手机靠近，而是，戴着 Spectacles 看眼手机就好。</p>
      </div>
    );
  }
}

Content2Component.defaultProps = {
};

export default Content2Component;
