

export const cryptoIcons = {
    BTC: require('../img/ic_btc.png'),
    ETH: require('../img/ic_eth.png')
};

export const IC_PICKER = require('../img/ic_picker.png');

const pair = (regular, italic) => ({regular, italic});
const gilroyPair = (name) => {
    const it = `Gilroy-${name}`;
    return pair(it, it + 'Italic');
};

export const fonts = {
    regular: gilroyPair('Regular'),
    medium: gilroyPair('Medium'),
    semibold: gilroyPair('Semibold'),
    bold: gilroyPair('Bold'),
    extrabold: gilroyPair('Extrabold'),
};