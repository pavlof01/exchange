import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Api from '../../services/Api';
import { keysToCamelCase } from '../../helpers';
import {createBasicNavigationOptions } from "../../style/navigation";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  centerContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  centerMessage: {
      flex: 1,
      height: 64,
      fontSize: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
  },
  rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      paddingLeft: 8,
      paddingRight: 8,
  },
  alternate_background: {
      backgroundColor: '#EEEEEE'
  },
  userName: {
      fontWeight: 'bold',
      color: '#333333',
      fontSize: 12,
      paddingLeft: 2,
      paddingRight: 2,
      flex: 2,
  },
  amount: {
      color: '#111111',
      fontWeight: 'bold',
      paddingLeft: 2,
      paddingRight: 2,
      textAlign: 'center',
      flex: 2,
  },
  info: {
      paddingLeft: 2,
      paddingRight: 2,
      textAlign: 'center',
      flex: 2,
  },
  smallInfo: {
      fontSize: 11,
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1,
  },
});

export default class Ads extends Component {
  static navigationOptions = createBasicNavigationOptions('MyAds');

  state = {
    ads: [],
    load:true
  };

  componentDidMount() {
    this.loadAds();
  }

  loadAds = () => {
    Api.get('/me/pro')
      .then(response => this.setState({
        ads: response.data.ads.map(ad => keysToCamelCase(ad)),
        load: false
      }))
};

  renderItem = ({item, index}) => {
    const alt = index % 2 === 1;
    return (
            <View style={[styles.rowContainer, alt ? styles.alternate_background : null]}>
                <Text style={styles.smallInfo}>#{item.id}</Text>
                <Text style={styles.userName}>{item.createdAt}</Text>
                <Text style={styles.info}>{item.isActive}</Text>
                <Text style={styles.info}>{item.cryptoCurrencyCode}</Text>
                <Text style={styles.info}>{item.price}</Text>
                <Text style={styles.info}>{item.avgPriceOffset}</Text>
            </View>
      );
};
  render() {
    return (
      <ScrollView contentContainerStyle={{flex:1}}>
        {this.state.load ? 
        (<ActivityIndicator style={{flex:1, alignItems:'center'}} size="large"/>)
        :
        (<FlatList
            data={this.state.ads}
            renderItem={this.renderItem}
            keyExtractor={i => i.id}
            ListEmptyComponent={this.state.load ? null:<Text style={styles.centerMessage}>У вас ещё не было сделок</Text>}
        />)} 
            
      </ScrollView>
    )
  }
};
