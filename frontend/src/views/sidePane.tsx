import './style/sidePane.css';

import { Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import * as React from 'react';
// const {SubMenu} = Menu;
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps{

}

interface IState {
  chosenIndex: string;
}
class Header extends React.Component <IProps, IState>{
  constructor(props: IProps){
    super(props);
    this.state = {
      chosenIndex: '' 
    }
    
  }

  handleClick= (param: ClickParam)=>{
    this.setState({
      chosenIndex: param.key 
    });
    // this.props.history.push('/employee');
    switch (param.key){
      case 'fire': {
        this.props.history.push('/employee');
        break;
      }
      case 'solution': {
        this.props.history.push('/department');
        break;
      }
      case 'cloud': {
        this.props.history.push('/leave');
        break;
      }
      case 'filter': {
        this.props.history.push('/attendance');
        break;
      }
    }
    
  }

  render(){
    return (
      <>
        <Menu 
          selectedKeys={[this.state.chosenIndex]} 
          mode="inline" 
          onClick={this.handleClick} 
          className="sidePane">
          <Menu.Item key = "filter">
            <Icon type = "filter" />
            考勤统计
          </Menu.Item>
          <Menu.Item key = "cloud">
            <Icon type = "cloud" />
            请假申请
          </Menu.Item>
          <Menu.Item key = "fire">
            <Icon type = "fire" />
            员工管理
          </Menu.Item>
          <Menu.Item key = "solution">
            <Icon type = "solution" />
            部门管理
          </Menu.Item>
        </Menu>
      </>
    )
  }
}
export default withRouter(Header)