import * as React from 'react';

import Department,{IDepartmentProps} from './department';
import {Button} from 'antd';
import '../style/departManage.css';


interface IState {
  departments:IDepartmentProps[]
}

export default class departmentManage extends React.Component <{}, IState>  {
  constructor(props: {}) {
    super(props);
    this.state={
      departments:[
        {name: "人事部门", description: "都是HR", avatarSrc: "./static/2.jpg"},
        {name: "研发部门", description: "都是秃头程序员", avatarSrc: "./static/3.jpg"},
        {name: "销售部门" ,description: "都是销售", avatarSrc: "./static/5.jpg"}
      ]
    };
  }
  render() {
    const departments = this.state.departments.map(item => {
      return <Department name={item.name} description={item.description} avatarSrc={item.avatarSrc} key={item.name}/>
    })
    return (
      <>
        <div className="flex-box">
          {departments}
          <div className="department-manage flex-item">
            <Button type="danger" size="large" className="department-manage-button"> 新建部门 </Button>
            <Button type="primary" size="large" className="department-manage-button"> 修改部门 </Button>
          </div>
        </div>
      </>
      
    )
  }
}