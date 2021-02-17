cc.Class({
    extends: require('DetailValue'),

    setData(data) {
        const self = this;
        let label = self.node.getComponent(cc.Label);
        label.string = data.main.humidity;
    },

    reset() {
        const self = this;
        let label = self.node.getComponent(cc.Label);
        label.string = '';
    },
});
