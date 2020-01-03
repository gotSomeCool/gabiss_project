import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app';

moment.locale('zhCN');
ReactDOM.render(
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </HashRouter>
  ,
document.getElementById('example'));
