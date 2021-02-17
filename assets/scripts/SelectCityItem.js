cc.Class({
    extends: cc.Component,

    properties: {
        labelCity: cc.Label,
    },

    ctor() {
        const self = this;
        self.city = "";
    },

    onLoad() {
        const self = this;
        self.node.on("click", self.handleButtonClicked, self);
    },

    setCity(city) {
        const self = this;
        self.city = city;
        self.labelCity.string = city;
    },

    handleButtonClicked() {
        const self = this;
        EventManager.publish("selectCity", self.city);
    },
});
