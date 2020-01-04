import './style/myHeader.css';

import { Avatar } from 'antd';
import * as React from 'react';

export default class Header extends React.Component {
  render(){
    return (
      <div className="myHeader">
        <div className="headerBody">
          <span className="title">
          ☀，公司考勤管理系统 🐂🍺
          </span>
          <div className="headerAvatar">
          {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={64} /> */}
          <Avatar  size={64} style={{ backgroundColor: '#87d068' }} src="./static/4.png">头像 </Avatar>
          </div>
        </div>
      </div>
    )
  }
}