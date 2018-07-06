import React, { Component } from 'react';

import { objMap } from '../../helpers'
import Api from '../../services/Api';
import {ActivityIndicator, StyleSheet, Text} from "react-native";
import PrimaryButton from "../../style/PrimaryButton";
import CardPicker from "../../style/CardPicker";
import MenuOption from "react-native-popup-menu/src/MenuOption";
import FormTextInput from "../FormTextInput";

const styles = StyleSheet.create({
    header: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    info: {
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
    },
    infoText: {
        margin: 2,
        fontSize: 16,
    },
    bold: {
        margin: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: '#dd0057',
        marginBottom: 4,
    },
});

export default class Feedback extends Component {
    state = {
        feedback: this.props.feedback || {},
        pending: false,
        form: {
            grade: (this.props.feedback && this.props.feedback.grade) || "neutral",
            body: (this.props.feedback && this.props.feedback.body) || "",
        }
    };

    onSubmit = () => {
        this.setState({errors: null, pending: true});

        let request = this.state.feedback.id ?
            Api.patch('/feedbacks/' + this.state.feedback.id, this.state.form) :
            Api.post('/feedbacks', {...this.state.form, trade_id: this.props.trade.id});

        request.then(response => this.setState({feedback: response.data.feedback, pending: false}))
            .catch(error => this.setState({errors: error.response.data.errors, pending: false}))
    };

    onBodyChanged = (value) => this.setState({ form: { body: value } });
    onGradeChanged = (value) => this.setState({ form: { grade: value } });

    render () {
        return <React.Fragment>
            <Text style={styles.header}>Ваш отзыв</Text>

            <CardPicker style={styles.picker} onValueChange={this.onGradeChanged}
                        selectedValue={this.state.form.grade}
                        renderButton={(value, text) => <Text style={styles.cardText}>{text}</Text>}
                        fontSize={16}>
                <MenuOption value="positive" text={'ПОЛОЖИТЕЛЬНЫЙ'}/>
                <MenuOption value="neutral" text={'НЕЙТРАЛЬНЫЙ'}/>
                <MenuOption value="block" text={'ОТРИЦАТЕЛЬНЫЙ'}/>
            </CardPicker>

            <FormTextInput
                onChangeText={this.onBodyChanged}
                multiline
                style={{height: 96, padding: 8}}
                value={this.state.form.body ? this.state.form.body : ""}
                onChange={this.onBodyChanged}
                placeholder="Комментарий"
                maxLength={140}
            />

            <PrimaryButton title={this.state.feedback.id ? 'Обновить' : 'Отправить'} disabled={this.state.pending} onPress={this.onSubmit}>
                {this.state.pending ? <ActivityIndicator size="large"/> : undefined}
            </PrimaryButton>

            {
                this.state.errors &&
                objMap(this.state.errors, (key, value) => <Text style={styles.error} key={key}>{key}: {value.join('. ')}</Text>)
            }
        </React.Fragment>
    }
}