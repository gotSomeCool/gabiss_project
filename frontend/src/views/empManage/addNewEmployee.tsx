import * as React from 'react';
import '../style/empManage.css';

import {Card, Button, Input, Select, Divider} from 'antd';
const {Option} = Select; 
interface IState {
  Name: string,
  Gender: string,
  DepartmentId: number
}
export class AddNewOne extends React.Component <{}, IState> {
  constructor(props: {}){
    super(props);
    this.state = {
      Name: '',
      Gender: '',
      DepartmentId: 0
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      Name: event.target.value
    });
  }
  render() {
    return (
      <div className="addNew">
          <Card title="添加新员工" style={{width:300}}>
          <Input size="large" placeholder="员工姓名" onChange={this.handleChange}/>
          <Divider type="horizontal" />
          <Select
            showSearch
            style={{width: 200}}
            placeholder="选择一个部门"
          >
            <Option value="123">人事部</Option>
            <Option value="124">研发部</Option>
            <Option value="125">市场部部</Option>
          </Select>
          <Divider type="horizontal" />
          <Select 
            style={{width: 200}}
            placeholder="选择性别"
          >
            <Option value="男"> 男 </Option>
            <Option value="女"> 女 </Option>
          </Select>
          <Divider type="horizontal" />
          <Button type="primary">添加</Button>
        </Card>
      </div>
      
    )
  }
}