import React from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    header: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
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
});

class TradeAdvices extends React.Component {

    render() {
        return (
            <React.Fragment>
                <View style={styles.info}>
                    <Text style={styles.header}>Советы</Text>
                    <Text style={styles.infoText}>Прочитайте объявление и проверьте условия.</Text>
                    <Text style={styles.infoText}>Предложите место встречи и время, если необходима сделка с наличными.</Text>
                    <Text style={styles.infoText}>Остерегайтесь мошенников! Проверяйте отзывы в профиле и проявляйте особую осторожность с недавно зарегистрированными пользователями.</Text>
                    <Text style={styles.infoText}>Обратите внимание, что округления и колебания цен могут изменить окончательную сумму в биткоинах. Сумма фиатных денег, вводимая вами, имеет значение, и сумма в биткоинах рассчитывается на момент запроса.</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.header}>BitChange обеспечивает вашу безопасность</Text>
                    <Text style={styles.infoText}>Криптовалюта блокируется в депонировании платежа на BitChange, после того как вы отправили запрос. Оплатите счёт, отметьте его как оплаченный, и продавец отправит Вам криптовалюту, когда перечисление платежа отразится на его счете.</Text>
                    <Text style={styles.bold}>Обратите внимание: в настоящий момент вы можете запросить депонирование не больше, чем на 0.44 BTC. Вы сможете покупать на большую сумму, как только у вас будет достаточный объем сделок и репутация. Именно Продавец устанавливает ограничения.</Text>
                    <Text style={styles.infoText}>Депонирование платежей защищает и Покупателя, и Продавца в онлайн-сделках.</Text>
                </View>
            </React.Fragment>
        );
    }
}

export default TradeAdvices;
