import '../style/empManage.css';

import { Button, Card, Divider, Input, message, Select } from 'antd';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import { IDepartment } from '../department/department';

const {Option} = Select; 

interface IState {
  newEmployee: {
    Name: string,
    Gender: string,
    DepartmentId: Number
  },
  departments: IDepartment[]
}
export class AddNewOne extends React.Component <{}, IState> {
  constructor(props: {}){
    super(props);
    this.state = {
      newEmployee : {
        Name: '',
        Gender: '',
        DepartmentId: 0},
      departments: []
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newEmployee: Object.assign({},this.state.newEmployee,{Name: event.target.value})
    });
  }
  componentDidMount() {
    Axios.get(`${SERVER_IP}/department/getAll`).then(res => {
      this.setState({
        departments: res.data
      });
    });
  }
  addNewEmployee() {
    const {
      Gender,
      Name,
      DepartmentId
    } = this.state.newEmployee;
    Gender!== '' && Name !== '' && DepartmentId && Axios.get(`${SERVER_IP}/emp/addNew`,{params: {
      gender: Gender,
      name: Name,
      departmentId: DepartmentId
    }}).then(() => {
      message.success('添加员工成功');
      this.setState({
        newEmployee:{
          Gender: '',
          Name: '',
          DepartmentId: 0
        }
      });
    });
  }
  render() {
    const departments = this.state.departments.map(item => {
      return (
        <Option value={item.Id}>{item.Name}</Option>
      )
    })
    return (
      <div className="addNew">
          <Card title="添加新员工" style={{width:'30vw'}}>
          <Input size="large" placeholder="员工姓名" onChange={this.handleChange}/>
          <Divider type="horizontal" />
          <Select
            showSearch
            style={{width: 200}}
            placeholder="选择一个部门"
          >
            {departments}
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