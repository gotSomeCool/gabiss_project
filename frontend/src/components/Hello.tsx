import * as React from 'react';
import {Button} from 'antd';
import './hello.css';
export default class Hello extends React.Component {
  render() {
    return (
      <>
        <h1>Hello </h1>
        <Button type="primary"> Button </Button>
      </>
    )
  }
}