import * as React from 'react';

import 'antd/dist/antd.css';

import {Header} from './views/Header';
import EmpManage from './views/empManage/index';
export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <EmpManage />
      </>
    )
  }
}