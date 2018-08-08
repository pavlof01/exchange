import React from 'react';
import {
  View, ActivityIndicator, StyleSheet, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCommonStatusBar } from "../../style/navigation";
import { checkPincode } from "../../actions/app";

const mapStateToProps = (state) => ({
  isFetching: state.session.pending,
  error: state.session.error,
});

const mapDispatchToProps = dispatch => ({
  route: () => dispatch(checkPincode()),
});

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 16,
  },
});

class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    props.route();
  }

  static displayError(err) {
    if (!err) return undefined;

    let str;

    try {
      const req = err["error"]["request"];
      str = `${req["_method"]} ${req["_url"]}\n${JSON.stringify(req["_headers"])}\n\n${req["status"]}`;
    } catch (e) {
      str = "Unknown error"
    }
    return (<Text style={styles.errorText}>{str}</Text>);
  }

  render() {
    return withCommonStatusBar(<View style={styles.centerContent}>
      {this.props.isFetching ? <ActivityIndicator size="large" /> : undefined}
      {SplashScreen.displayError(this.props.error)}
    </View>)
  }
}

SplashScreen.propTypes = {
  route: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
