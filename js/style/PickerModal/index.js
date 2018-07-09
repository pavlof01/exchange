import React from 'react';
import {
    StyleSheet,
    View,
    Modal, PickerIOS, Picker, Platform
} from 'react-native';
import BorderlessButton from '../BorderlessButton';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#00000080',
    },
});

const isAndroid = Platform.OS === 'android';

class PickerModal extends React.Component {

    state = {
        shouldPick: false
    };

    open = () => this.setState({shouldPick: true});
    hide = () => this.setState({shouldPick: false});

    render() {
        if(isAndroid) {
            return <Picker
                selectedValue={this.props.countryCode || 'ANY'}
                style={{ height: 50 }}
                onValueChange={this.props.onCountryCodeChange}>
                <Picker.Item value="ANY" label={'Не выбрано'}/>
                {this.props.countries.map(
                    country => <Picker.Item key={country.code} value={country.code} label={country.name}/>
                )}
            </Picker>
        }


        return (<React.Fragment>
                <BorderlessButton title={(this.props.countryMap[this.props.countryCode] || {name: 'Не выбрано'} ).name} onPress={this.open}/>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.shouldPick}
                    onRequestClose={this.hide}
                >
                    <View style={styles.container}>
                        <View style={{flex:1}}/>
                        <View style={{backgroundColor: 'white'}}>
                            <BorderlessButton
                                title="Назад"
                                onPress={this.hide}
                            />
                            <PickerIOS
                                selectedValue={this.props.countryCode || 'ANY'}
                                onValueChange={this.props.onCountryCodeChange}>
                                <PickerIOS.Item value="ANY" label={'Не выбрано'}/>
                                {this.props.countries.map(
                                    country => <PickerIOS.Item key={country.code} value={country.code} label={country.name}/>
                                )}
                            </PickerIOS>
                        </View>
                    </View>
                </Modal
            ></React.Fragment>
        );
    }
}

export default PickerModal;
