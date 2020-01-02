import '../style/empManage.css';

import { Button, Divider, message, Modal, Table } from 'antd';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';

export interface IEmployee {
  Id: string;
  Name: string;
  Gender: string;
  DepartmentId:number;
}

interface IState {
  data: IEmployee[];
}

export class Attendance extends React.Component <{}, IState>{
  constructor(props:{}){
    super(props);
    this.state = {
      data : []
    }
  }
  getAllData() {
    return new Promise((resolve,reject) => {
      Axios.get(`${SERVER_IP}/emp/getAll`).then(res => {
        this.setState({
          data:res.data
        });
        resolve();
      }).catch((err) => {
        reject(err);
      });
    })
  }
  componentDidMount() {
    this.getAllData();
  }
  handleDelete(record: any) {
    Axios.get(`${SERVER_IP}/emp/remove`,{params:{
      id:record.Id  
    }}).then(() => {
      message.success('删除成功');
      this.getAllData();
    }).catch(() => {
      message.error('删除失败');
    })
  }
  render() {
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
        render:(record:any) => (
          <>
            <Button type="primary">干点啥</Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => this.handleDelete(record)}>删除</Button>
          </>
        )
      }
    ]
    return (
        <Table 
          dataSource={this.state.data} 
          columns={columns} 
          rowKey={record=>record.Id} 
          className="empTable" 
        />
    )
  }
}