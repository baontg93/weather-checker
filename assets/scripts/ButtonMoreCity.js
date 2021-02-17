cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;
        EventManager.register(self);
        self.node.active = true;
        self.node.on("click", self.handleButtonClick, self);
    },

    onEvent(type, data) {
        const self = this;
        switch (type) {
            case "resetListCity":
                self.node.active = true;
                break;

            default:
                break;
        }
    },

    handleButtonClick() {
        const self = this;
        self.node.active = false;
        EventManager.publish("loadMoreCity", self);
    },
});