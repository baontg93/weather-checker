cc.Class({
    extends: require('DetailValue'),

    setData(data) {
        const self = this;
        let label = self.node.getComponent(cc.Label);
        label.string = `${self.kelvinToCelcius(data.main.feels_like)}℃`;
    },

    kelvinToCelcius(input) {
        return (input - 273.15).toPrecision(2);
    },

    reset() {
        const self = this;
        let label = self.node.getComponent(cc.Label);
        label.string = '';
    },
});
