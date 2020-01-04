import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import { IAttend } from './attend';

interface IState {
  data: IAttend[]
}
export default class ShowAttendance extends React.Component <{}, IState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    Axios.get(`${SERVER_IP}/attendance/getAll`).then(res => {
      this.setState({
        data: res.data
      });
    });
  }
  render() {
    return (
      <>

      </>
    )
  }
}