import * as React from 'react';

import {Menu, Icon,Divider} from 'antd';
import { ClickParam } from 'antd/lib/menu';
// const {SubMenu} = Menu;

interface IProps {

}

interface IState {
  chosenIndex: string;
}
export class Header extends React.Component <IProps, IState>{
  constructor(props: IProps){
    super(props);
    this.state = {
      chosenIndex: 'fire' 
    }
  }

  handleClick= (param: ClickParam)=>{
    this.setState({
      chosenIndex: param.key 
    });
  }

  render(){
    return (
      <>
        <Menu selectedKeys={[this.state.chosenIndex]} mode="horizontal" onClick={this.handleClick} style={{textAlign:"center"}}>
          <Menu.Item key = "mail">
            <Icon type = "mail" />
            考勤统计
          </Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key = "cloud">
            <Icon type = "cloud" />
            请假申请
          </Menu.Item>
          <Divider type="vertical" />
          <Menu.Item key = "fire">
            <Icon type = "fire" />
            员工管理
          </Menu.Item>
        </Menu>
      </>
    )
  }
}