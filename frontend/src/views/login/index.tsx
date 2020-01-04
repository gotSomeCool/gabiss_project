import './index.css';

import { Button, Card, Divider, Input, message } from 'antd';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { PASS_WORD, USER_NAME } from '../../static/const';

interface IProps extends RouteComponentProps {

}
class Login extends React.Component <IProps>{
  private users:string [];
  private passwords:string [];
  private username: string;
  private password: string;
  constructor(props:IProps) {
    super(props);
    this.users = USER_NAME;
    this.passwords = PASS_WORD;
    this.username = '';
    this.password = '';
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(username:boolean,event: React.ChangeEvent<HTMLInputElement>) {
    if(username) {
      this.username = event.target.value;
    } else {
      this.password = event.target.value;
    }
  }
  handleClick() {
    if(this.users.indexOf(this.username) >= 0 && this.passwords.indexOf(this.password) >=0 ) {
      message.success('登录成功');
      this.props.history.push('/attendance');
    } else {
      message.warning('用户名或密码错');
    }
  }
  render() {
    return (
      <div className="login-body">
        <div className='login-box'>
          <Card 
            style={{width:'50%'}}
          >
            <span>用户名:</span>
            <Input placeholder="输入用户名" onChange={(event) => {this.handleChange(true, event)}} />
            <Divider type="horizontal" />
            <span>密码:</span>
            <Input placeholder="密码" type="password" onChange={(event) => {this.handleChange(false, event)}}/>
            <Divider type="horizontal" />
            <Button type="primary" size="large" onClick={this.handleClick}> 登录 </Button>
          </Card>
        </div>
      </div>
    )
  }
}
export default withRouter(Login);