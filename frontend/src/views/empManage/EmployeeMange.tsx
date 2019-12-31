import * as React from 'react';
// import axios from 'axios';
import {Table, Divider, Tag, Button} from 'antd';

import '../style/empManage.css';
import Axios from 'axios';

export interface ICount {
  Id: string;
  Name: string;
  Gender: string;
  DepartmentId:number;
}

interface IState {
  data: ICount[];
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'Name',
    key: 'Name'
  },{
    title: '性别',
    dataIndex: 'Gender',
    key: 'Gender'
  },{
    title: '部门',
    dataIndex: 'DepartmentId',
    key: 'DepartmentId'
  },{
    title: 'Action',
    key: 'action',
    render:() => (
      <>
        <Button type="primary">干点啥</Button>
        <Divider type="vertical" />
        <Button type="danger">删除</Button>
      </>
    )
  }
]
export class Attendance extends React.Component <{}, IState>{
  constructor(props:{}){
    super(props);
    this.state = {
      data : []
    }
  }
  componentDidMount() {
    Axios.get('http://127.0.0.1:3009/emp/getAll').then(data => {
      // console.log(data);
      this.setState({
        data:data.data
      });
    });
  }
  render() {
    return (
      <div className="mainBody">
        <Table dataSource={this.state.data} columns={columns} rowKey={record=>record.Id} className="empTable" />
      </div>
    )
  }
}