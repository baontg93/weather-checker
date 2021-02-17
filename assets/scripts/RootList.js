cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;
        EventManager.register(self);
        self.node.active = true;
    },

    onEvent(event, data) {
        const self = this;
        switch (event) {
            case "selectCity":
                self.node.active = false;
                break;

            case "backToList":
                self.node.active = true;
                break;
        }
    },
});
