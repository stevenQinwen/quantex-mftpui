import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Login from 'containers/Login';
import App from 'containers/Main';
import EngineDesign from 'containers/page/EngineDesign';
import SinglePage from 'containers/Main/SinglePage';
import pageMap from 'containers/page/pagemap';

const pageMapList = [...pageMap.entries()]; // 获取所有页面的Map形式数组

class RootComponent extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Login} />
        <Route path="/app" component={App}>
          <IndexRoute component={EngineDesign}/>
          {pageMapList.map((item) => {
            return <Route key={item[0]} path={item[0]} component={item[1]} />;
          })}
        </Route>
        <Route path="/page" component={SinglePage}>
          {pageMapList.map((item) => {
            return <Route key={item[0]} path={item[0]} component={item[1]} />;
          })}
        </Route>
      </Router>
    );
  }
}

export default RootComponent;
