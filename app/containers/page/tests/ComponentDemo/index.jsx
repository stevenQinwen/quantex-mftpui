import React from 'react';
import { Tabs } from 'antd';
import FormItemWrapperDemo from 'components/FormItemWrapper/Demo';
import SelectDemo from 'components/Select/Demo';
import ListSelectDemo from 'components/ListSelect/Demo';
import TranslateDemo from 'components/Translate/Demo';
import TreeDemo from 'components/Tree/Demo';
import TreeSelectDemo from 'components/TreeSelect/Demo';
import DateTimeTranslateDemo from 'components/DateTimeTranslate/Demo';
import CascaderDemo from 'components/Cascader/Demo';
import NumberFormatDemo from 'components/NumberFormat/Demo';
import UploadDemo from 'components/Upload/Demo';
import Table from 'components/Table/Demo';
import SearchTableDemo from 'components/SearchTable/Demo';
import CheckboxDemo from 'components/CheckboxGroup/Demo';
import RadioDemo from 'components/Radio/Demo';
import InputNumberDemo from 'components/InputNumber/Demo';
import AutoEllipsisDemo from 'components/AutoEllipsis/Demo';
import InputGroup from 'components/InputGroup/Demo';
import ModalDemo from 'components/Modal/Demo';
import IndexedDBDemo from 'utils/IndexedDB/Demo';
import SortableDemo from '../Sortable'; // 可拖拽用例
import SortableMobxDemo from '../SortableMobx'; // 可拖拽用例

const styles = require('./index.scss');

const TabPane = Tabs.TabPane;

class ComponentDemoComponent extends React.Component {
  render() {
    const demos = [{
      name: 'SortableMobxDemo',
      component: SortableMobxDemo
    }, {
      name: 'Sortable',
      component: SortableDemo
    }, {
      name: 'IndexedDB',
      component: IndexedDBDemo
    }, {
      name: 'Upload',
      component: UploadDemo
    }, {
      name: 'FormItemWrapper',
      component: FormItemWrapperDemo
    }, {
      name: 'Select',
      component: SelectDemo
    }, {
      name: 'ListSelect',
      component: ListSelectDemo
    }, {
      name: 'Tree',
      component: TreeDemo
    }, {
      name: 'TreeSelect',
      component: TreeSelectDemo
    }, {
      name: 'Translate',
      component: TranslateDemo
    }, {
      name: 'CheckboxGroup',
      component: CheckboxDemo
    }, {
      name: 'Radio',
      component: RadioDemo
    }, {
      name: 'DateTimeTranslate',
      component: DateTimeTranslateDemo
    }, {
      name: 'Cascader',
      component: CascaderDemo
    }, {
      name: 'InputNumber',
      component: InputNumberDemo
    }, {
      name: 'NumberFormat',
      component: NumberFormatDemo
    }, {
      name: 'Table',
      component: Table
    }, {
      name: 'SearchTable',
      component: SearchTableDemo
    }, {
      name: 'AutoEllipsis',
      component: AutoEllipsisDemo
    }, {
      name: 'InputGroup',
      component: InputGroup
    }, {
      name: 'Modal',
      component: ModalDemo
    }
    // , {
    //   name: 'Alert',
    //   component: AlertDemo
    // }
    ];
    return (
      <div className={styles.root}>
        <Tabs tabPosition='left'>
          {
            demos.map((demo) => {
              const Demo = demo.component;
              return <TabPane tab={demo.name} key={demo.name}><Demo /></TabPane>;
            })
          }
        </Tabs>
      </div>
    );
  }
}
/**/
ComponentDemoComponent.defaultProps = {
};

export default ComponentDemoComponent;
