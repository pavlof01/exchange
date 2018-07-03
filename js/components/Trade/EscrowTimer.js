import React, { Component } from 'react';
import {StyleSheet, Text} from "react-native";


const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    },
});

export default class EscrowTimer extends Component {
  state = {
    remain: this.calculate()
  };

  componentDidMount() {
    this.setState({
      intervalId: setInterval(this.update, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  };

  update = () => {
    this.setState({remain: this.calculate()});
  };

  calculate() {
    let remainMs = new Date(this.props.expiredAt) - new Date();
    let remainMin = Math.floor(remainMs / 1000 / 60 + 1);
    return remainMin > 0 ? remainMin : 0;
  }

  render() {
    return <Text style={styles.bold}>{this.state.remain}</Text>
  }
}