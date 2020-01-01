import * as React from 'react';
import {Avatar} from 'antd';
import './style/myHeader.css';

export default class Header extends React.Component {
  render(){
    return (
      <div className="myHeader">
        <div className="headerBody">
          <span className="title">
            不会真的有人会做吧
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