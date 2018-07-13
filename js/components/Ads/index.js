import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderBar from "../../style/HeaderBar";
import Api from '../../services/Api';
import { keysToCamelCase } from '../../helpers';
import {createBasicNavigationOptions, withCommonStatusBar} from "../../style/navigation";


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
      fontSize: 16,
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
    this.load({page: 1});
  }

  load = (params = {}) => {
    params = {sort: this.state.sort, limit: 10, ...params};

    Api.get('/me/pro'/*, params*/)
      .then(response => this.setState({
        ads: response.data.ads.map(ad => keysToCamelCase(ad)),
        load:false
      }))
};

  renderItem = ({item, index}) => {
    const alt = index % 2 === 1;
    return (
            <View style={[styles.rowContainer, alt ? styles.alternate_background : undefined]}>
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
    console.log(this.state.ads);
    return (
      <View>
        <FlatList data={this.state.ads}
                          renderItem={this.renderItem}
                          keyExtractor={i => i.id}
                          //ListEmptyComponent={<Text /*style={styles.centerMessage}*/>У вас ещё не было сделок</Text>}
                          ListFooterComponent={this.state.load && <ActivityIndicator size="large"/> }
                          //onEndReached={this.loadNext}
                          //onEndReachedThreshold={0.3}
                          />}
      </View>
    )
  }
};
