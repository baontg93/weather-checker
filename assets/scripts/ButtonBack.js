cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;
        self.node.on("click", self.handleButtonClick, self);
    },

    handleButtonClick() {
        const self = this;
        EventManager.publish("backToList", self);
    },
});