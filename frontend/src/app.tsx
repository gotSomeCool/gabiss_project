import * as React from 'react';

import {Route} from 'react-router-dom';

import './app.css';

import SidePane from './views/sidePane';
import EmpManage from './views/empManage/index';
import DepManage from './views/department/index';
import LeaManage from './views/leave/index';
import MyHeader from './views/myHeader';
export default class App extends React.Component {
  render() {
    return (
      <div>
        <MyHeader />
        <SidePane />
        <div className="mainBody">  
          <div className="Content">
            <Route path='/employee' component={EmpManage} />
            <Route path='/department' component={DepManage} />
            <Route path='/leave' component={LeaManage} />
          </div>
        </div>
      </div>
    )
  }
}