import '../style/empManage.css';

import { Button, Card, Divider, Input, message, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
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
    this.addNewEmployee = this.addNewEmployee.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.state = {
      newEmployee : {
        Name: '',
        Gender: '',
        DepartmentId: 0},
      departments: []
    }
  }
  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newEmployee: Object.assign({},this.state.newEmployee,{Name: event.target.value})
    });
  }
  handleGenderChange(value: string) {
    const newE = Object.assign({}, this.state.newEmployee, {Gender: value});
    this.setState({
      newEmployee:newE
    });
  }
  handleDepartmentChange(value: number) {
    const newE = Object.assign({}, this.state.newEmployee, {DepartmentId: value});
    this.setState({
      newEmployee:newE
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
      Bus.emit('empUpdate');
    });
  }
  render() {
    const departments = this.state.departments.map(item => {
      return (
        <Option value={item.Id} key={item.Id}>{item.Name}</Option>
      )
    })
    return (
      <div className="addNew">
        <Card title="添加新员工" style={{width:'30vw'}}>
          <Input size="large" placeholder="员工姓名" onChange={this.handleNameChange}/>
          <Divider type="horizontal" />
          <Select
            onChange={this.handleDepartmentChange}
            style={{width: 200}}
            placeholder="选择一个部门"
          >
            {departments}
          </Select>
          <Divider type="horizontal" />
          <Select 
            style={{width: 200}}
            placeholder="选择性别"
            onChange={this.handleGenderChange}
          >
            <Option value="男"> 男 </Option>
            <Option value="女"> 女 </Option>
          </Select>
          <Divider type="horizontal" />
          <Button type="primary" onClick={this.addNewEmployee}>添加</Button>
        </Card>
      </div>
      
    )
  }
}