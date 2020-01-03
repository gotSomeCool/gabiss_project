import '../style/empManage.css';

import { Button, Divider, message, Modal, Table } from 'antd';
import Axios from 'axios';
import { EventEmitter } from 'events';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import { IDepartment } from '../department/department';

export interface IEmployee {
  Id: string;
  Name: string;
  Gender: string;
  DepartmentId: string;
}

interface IState {
  data: IEmployee[];
  departments: IDepartment[];
}

export class Attendance extends React.Component <{}, IState>{
  private updateEvent: EventEmitter;
  constructor(props:{}){
    super(props);
    this.state = {
      data: [],
      departments: []
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
      Axios.get(`${SERVER_IP}/department/getAll`).then(res => {
        this.setState({
          departments: res.data
        });
        resolve();
      }).catch(err => {
        reject(err);
      })
    })
  }
  componentDidMount() {
    this.getAllData();
    this.updateEvent = Bus.addListener('empUpdate',()=>{
      this.getAllData();
    });
  }
  componentWillUnmount() {
    this.updateEvent.removeAllListeners('empUpdate');
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
        dataIndex: 'DepartmentName',
        key: 'DepartmentName'
      },{
        title: 'Action',
        key: 'action',
        render:(record:any) => (
          <>
            <Button type="primary"> 管理 </Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => this.handleDelete(record)}>删除</Button>
          </>
        )
      }
    ]
    const emps = this.state.data.map((item) => {
      const Found = this.state.departments.find(ele => ele.Id === item.DepartmentId);
      return Object.assign({}, item, {DepartmentName: Found ? Found.Name : ''});
    });
    return (
        <Table 
          dataSource={emps} 
          columns={columns} 
          rowKey={record=>record.Id} 
          className="empTable" 
        />
    )
  }
}