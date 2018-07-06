import React from 'react';
import {
    ActivityIndicator,
    StyleSheet, Text,
    View,
} from 'react-native';
import Separator from "../../style/Separator";
import User from "../../models/User";
import OnlineStatus from "../../style/OnlineStatus";
import CenterProgressBar from "../../style/CenterProgressBar";
import {objLength, objMap} from "../../helpers";
import Time from "../../values/Time";
import BorderlessButton from "../../style/BorderlessButton";

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
    userName: {
        fontWeight: 'bold',
        color: '#333333',
        fontSize: 24,
        marginLeft: 4,
    },
    feedback_grade: {
        fontSize: 11,
        marginLeft: 4,
        flex: 1,
    }
});

const Dt = (props) => <Text style={styles.bold}>{props.children}</Text>;
const Dd = (props) => <Text style={styles.infoText}>{props.children}</Text>;
const Span = (props) => <Text style={styles.infoText}>{props.children}</Text>;

class ProfileInfo extends React.Component {

    render() {
        const { profile, pending, openFeedback } = this.props;

        if (!profile) return <CenterProgressBar/>;

        return (
            <React.Fragment>
                <View style={styles.row}>
                    <OnlineStatus isOnline={profile.online}/>
                    <Text style={styles.userName}>{profile.user_name} ({User.approximateTradesCount(profile.completed_trades_count)})</Text>
                    <Text> {profile.feedback_grade}%</Text>
                    { pending && <ActivityIndicator />}
                </View>

                {/*{*/}
                    {/*this.props.user.isLogged && this.props.user.id !== profile.id ?*/}
                        {/*profile.blocked ?*/}
                            {/*<button className="profile__block removed-md" onClick={this.onBlackListDelete}>Заблокирован</button> :*/}
                            {/*<button className="profile__block removed-md" onClick={this.onBlackListInsert}/> :*/}
                        {/*null*/}
                {/*}*/}

                <View style={styles.info}>
                    <Dt>О себе</Dt>
                    <Dd>{profile.introduction}</Dd>
                    <Dt>Объем сделки</Dt>
                    {objMap(profile.trading_amount, (code, amount, i) => {
                        let lastRow = objLength(profile.trading_amount) === i + 1;

                        return lastRow ?
                            <Dd key={i}>{User.approximateTradingAmount(amount)} {code}</Dd> :
                            <Span key={i}>{User.approximateTradingAmount(amount)} {code}</Span>
                    })}
                    <Dt>Количество подтвержденных сделок</Dt>
                    <Dd><Span>
                    {User.approximateTradesCount(profile.completed_trades_count)} </Span>
                        с {profile.completed_trades_users_count} различными партнерами
                    </Dd>
                    <BorderlessButton title={'Просмотреть отзывы'} onPress={openFeedback} textStyle={{fontWeight: 'bold'}}/>
                    <Dd>Средняя оценка по отзывам: <Span>{profile.feedback_grade}%</Span></Dd>
                    <Dt>Подтверждение настоящего имени</Dt>
                    <Dd>0 проверенное подтверждение, 0 отклоненных подтверждения</Dd>
                    <Dt>Первая покупка</Dt>
                    <Dd>{profile.first_trade_at && new Time(profile.first_trade_at).estimatedTime}</Dd>
                    <Dt>Учетная запись создана</Dt>
                    <Dd>{new Time(profile.created_at).estimatedTime}</Dd>
                    <Dt>В последний раз был онлайн</Dt>
                    <Dd>{new Time(profile.current_sign_in_at).estimatedTime}</Dd>
                    <Dt>Язык</Dt>
                    <Dd>{profile.locale}</Dd>
                    <Dt>Email</Dt>
                    <Dd>Подтвержден {new Time(profile.created_at).estimatedTime}</Dd>
                    <Dt>Номер телефона</Dt>
                    <Dd>{
                        profile.phone_confirmed_at ?
                            `Подтвержден ${new Time(profile.phone_confirmed_at).estimatedTime}` :
                            'Не подтвержден'
                    }</Dd>
                    <Dt>Удостоверение личности (паспорт или водительские&nbsp;права)</Dt>
                    <Dd>{
                        profile.identified_at ?
                            `Подтверждено ${new Time(profile.identified_at).estimatedTime}` :
                            'Не подтверждено'
                    }</Dd>
                    <Dt>Заблокированные пользователи</Dt>
                    <Dd>Заблокирован {profile.blocker_users_count} пользователями</Dd>
                </View>

                <Separator/>

                <View style={styles.info}>
                    <Dt>Время задержки запуска депонирования платежа&nbsp;продавцом</Dt>
                    <Dd>Медиана: {profile.avg_escrow_release_time && Math.round(profile.avg_escrow_release_time)} минуты</Dd>
                    <Dd>Среднее: {profile.avg_escrow_release_time && Math.round(profile.avg_escrow_release_time)} минуты</Dd>
                </View>
            </React.Fragment>
        );
    }
}

export default ProfileInfo;
