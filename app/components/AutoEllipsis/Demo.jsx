import React from 'react';
import { Table } from 'antd';
import { Translate, AutoEllipsis } from 'components';

const columns = [{
  title: 'Name',
  width: 200,
  dataIndex: 'name',
  render: (text) => {
    return <AutoEllipsis><Translate value={text} transUrl="/api/v2/roles/dict" multiple transKey="id_name"/></AutoEllipsis>;
  }
}, {
  title: 'Address',
  dataIndex: 'address',
  render: (text) => {
    return <AutoEllipsis>{text}</AutoEllipsis>;
  }
}];
const data = [{
  name: '1,2,3,5,6',
  age: 32,
  address: 'New York No. 1 Lake Park London No. 1 Lake Park Sidney No. 1 Lake Park London No. London No. 1 Lake Park New York No. 1 Lake Park Sidney No. 1 Lake Park London No. New York No. 1 Lake Park London No. 1 Lake Park Sidney No. ',
}, {
  name: '2,3,4,6,7',
  age: 42,
  address: 'London No. 1 Lake Park New York No. 1 Lake Park Sidney No. 1 Lake Park London No. New York No. 1 Lake Park London No. 1 Lake Park Sidney No. 1 Lake Park London No. New York No. 1 Lake Park London No. 1 Lake Park Sidney No. ',
}, {
  name: '3,4,5',
  age: 32,
  address: 'Sidney No. 1 Lake Park London No. 1 Lake Park New York No. 1 Lake Park London No. 1 Lake Park New York No. 1 Lake Park Sidney No. 1 Lake Park London No. New York No. 1 Lake Park London No. 1 Lake Park Sidney No. 1 Lake Park London No. ',
}];

class DemoComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>简单用法</h1>
        <code>
          {`<AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div style={{ width: '200px' }}>
          <AutoEllipsis><span>我是省略文本，你能拿我咋地，爱咋地就咋地</span></AutoEllipsis>
        </div>
        <h1>简单用法/默认宽度足够的情况下不显示Tooltip</h1>
        <code>
          {`<AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div>
          <AutoEllipsis>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>
        </div>
        <h1>简单用法/showTitle=display</h1>
        <code>
          {`<AutoEllipsis showTitle="display">我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div>
          <AutoEllipsis showTitle="display">我没有被省略，但是我有一样有Tooltip</AutoEllipsis>
        </div>
        <h1>简单用法/showTitle=hidden</h1>
        <code>
          {`<AutoEllipsis showTitle="hidden">我是省略了。。。，但不要指望我显示Tooltip</AutoEllipsis>`}
        </code>
        <div style={{ width: '200px' }}>
          <AutoEllipsis showTitle="hidden">我是省略了。。。，但不要指望我显示Tooltip</AutoEllipsis>
        </div>
        <h1>width</h1>
        <code>
          {`<AutoEllipsis width={200}>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>`}
        </code>
        <div>
          <AutoEllipsis width={200}>我是省略文本，你能拿我咋地，爱咋地就咋地</AutoEllipsis>
        </div>
        <h1>content为翻译组件</h1>
        注意：如果由多项翻译组成，请把 Translate 放在一级子组件
        <code>
          {`<AutoEllipsis showTitle="display"><Translate value="1,2,3" transUrl="/api/v2/roles/dict" multiple transKey="id_name"/>——<Translate value="4" transUrl="/api/v2/roles/dict" transKey="id_name"/></AutoEllipsis>`}
        </code>
        <div style={{ width: '100px' }}>
          <AutoEllipsis>
            <Translate value={'1,2,3'} transUrl="/api/v2/roles/dict" multiple transKey="id_name"/>
            ——
            <Translate value="4" transUrl="/api/v2/roles/dict" transKey="id_name"/>
          </AutoEllipsis>
        </div>
        <h1>表格单元格省略</h1>
        注意：对需要省略的列配置增加render配置
        <code>
          {`{ title: 'Address', dataIndex: 'address', render: (text) => { return <AutoEllipsis>{text}</AutoEllipsis>;} }`}
        </code>
        <Table columns={columns} dataSource={data} pagination={false}/>
        <h1>表格单元格省略且单元格为翻译文本</h1>
        <code>
          {`{ title: 'Name', width: 200, dataIndex: 'name', render: (text) => { return <AutoEllipsis><Translate value={text} transUrl="/api/v2/roles/dict" multiple transKey="id_name"/></AutoEllipsis>;} }`}
        </code>
        <Table columns={columns} dataSource={data} pagination={false}/>
        <h1>利用系统封装的Table组件通过columns配置开启自动省略处理</h1>
        <code>
          {`[{
              title: 'Name',
              width: 200,
              autoEllipsis: true,
              dataIndex: 'name',
              render: (text) => {
                return <Translate value={text} transUrl="/api/v2/roles/dict" multiple transKey="id_name"/>;
              }
            }, {
              title: 'Address',
              dataIndex: 'address',
              autoEllipsis: true
            }]`}
        </code>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    );
  }
}

export default DemoComponent;
