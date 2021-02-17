cc.Class({
    extends: require("DetailValue"),

    setData(data) {
        const self = this;
        let label = self.node.getComponent(cc.Label);
        label.string = data.name;
    },

    reset() {
        const self = this;
        let label = self.node.getComponent(cc.Label);
        label.string = '';
    },
});
