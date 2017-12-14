import React, { Component } from 'react';
import { DatePicker } from 'antd';

import './index.scss';

export default class DatePickerComponent extends Component {
  state = {
    open: false
  }

  handleEnter = (event) => {
    // 回车关闭
    if (event.keyCode === 13) {
      this.handleOpenChange(false);
    }
  }

  handleOpenChange = (open) => {
    if (open) {
      document.addEventListener("keypress", this.handleEnter);
    } else {
      document.removeEventListener("keypress", this.handleEnter);
    }
    this.setState({
      open
    });
  }

  getCalendarContainer = () => { return this.refs.datePickerContainer; };

  render() {
    const { open } = this.state;
    return <div className='qx-date-picker' ref='datePickerContainer' id={this.props.id}>
      <DatePicker
        getCalendarContainer={this.getCalendarContainer}
        {...this.props}
        onOpenChange={this.handleOpenChange}
        open={open}
      />
    </div>;
  }
}
