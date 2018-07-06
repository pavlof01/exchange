import React from 'react';
import {
    ActivityIndicator, FlatList,
    StyleSheet, Text,
    View,
} from 'react-native';
import CenterProgressBar from "../../style/CenterProgressBar";
import {createBasicNavigationOptions, createNavigationOptionsWithButton} from "../../style/navigation";
import moment from "moment";
import CardPicker from "../../style/CardPicker";
import {MenuOption} from "react-native-popup-menu";

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
        marginTop: 8,
    },
    info: {
        backgroundColor: 'white',
        margin: 8,
        padding: 8,
        fontSize: 16,
    },
    bold: {
        margin: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    userName: {
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 24,
        marginLeft: 4,
    },
    date: {
        fontSize: 11,
    },
    reviewContainer: {
        padding: 8,
    },
    picker: {
        height: 50,
        width: 100,
    },
    cardText: {
        fontSize: 24,
        color: '#333333',
        margin: 8,
        fontWeight: "bold",
    },
    reviewPositive: {
        color: '#696969',
        backgroundColor: '#fbf5eb',
        borderColor: '#14d459',
        borderRadius: 4,
        borderWidth: 2,
        padding: 8,
        margin: 8,
    },
    reviewNeutral: {
        color: '#696969',
        backgroundColor: '#fbf5eb',
        borderColor: '#696969',
        borderRadius: 4,
        borderWidth: 2,
        padding: 8,
        margin: 8,
    },
    reviewNegative: {
        color: '#696969',
        backgroundColor: '#fbf5eb',
        borderColor: '#d61b38',
        borderRadius: 4,
        borderWidth: 2,
        padding: 8,
        margin: 8,
    }
});

const Dt = (props) => <Text style={styles.bold}>{props.children}</Text>;
const Dd = (props) => <Text style={styles.infoText}>{props.children}</Text>;
const Span = (props) => <Text style={styles.infoText}>{props.children}</Text>;

class Feedback extends React.Component {

    static navigationOptions = createBasicNavigationOptions('Отзывы');
    state = {
        screen: "all",
        user_name: this.props.navigation.getParam('user_name', 'NO-ID'),
    };

    componentWillMount() {
        // moment.locale('ru');
        this.props.updateFeedbacks({
            user_name: this.state.user_name,
            grade: "all", page: 1
        });
    }

    onChangeScreenHandler = (screen) => {
        this.setState({ screen });
        this.props.updateFeedbacks({
            user_name: this.state.user_name,
            grade: screen, page: 1
        });
    };

    loadNext = () => {
        const { feedbacks } = this.props;
        if(feedbacks.page >= feedbacks.total_pages) {
            return;
        }

        this.props.updateFeedbacks({
            user_name: this.state.user_name,
            grade: this.state.screen,
            page: this.props.feedbacks.page++,
        });
    };

    renderItem ({item}) {
        let style;
        switch(item.grade) {
            case "block": style = styles.reviewNegative; break;
            case "neutral": style = styles.reviewNeutral; break;
            default: style = styles.reviewPositive; break;
        }

        return <View style={styles.reviewContainer}>
            <Text style={styles.date}>{moment(item.date).format("DD MMMM YYYY г. HH:mm")}</Text>
            <Text style={style}>{item.body}</Text>
        </View>
    }

    render() {
        const { feedbacks } = this.props;
        const { user_name } = this.state;

        if (!user_name) return <Text>Invalid user</Text>;

        return (
            <React.Fragment>

                <View style={styles.row}>
                    <Text style={styles.userName}>{user_name}</Text>
                    { feedbacks.pending && <ActivityIndicator />}
                </View>

                <CardPicker style={styles.picker} onValueChange={this.onChangeScreenHandler}
                            selectedValue={this.state.screen}
                            renderButton={(value, text) => <Text style={styles.cardText}>{text}</Text>}
                            fontSize={16}>
                    <MenuOption value="all" text={`ВСЕ: ${feedbacks.all_count}`}/>
                    <MenuOption value="positive" text={`ПОЛОЖИТЕЛЬНЫЕ: ${feedbacks.positive_count}`}/>
                    <MenuOption value="neutral" text={`НЕЙТРАЛЬНЫЕ: ${feedbacks.neutral_count}`}/>
                    <MenuOption value="block" text={`ОТРИЦАТЕЛЬНЫЕ: ${feedbacks.block_count}`}/>
                </CardPicker>

                {this.state.pending && this.state.trades.length === 0 ?

                    <CenterProgressBar/> :

                    <FlatList data={feedbacks.data}
                              renderItem={this.renderItem}
                              keyExtractor={i => i.id}
                              onEndReached={this.loadNext}
                              onEndReachedThreshold={0.3}/>}

            </React.Fragment>
        );
    }
}

export default Feedback;
