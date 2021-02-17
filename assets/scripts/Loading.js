cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;
        EventManager.register(self);
        self.node.active = false;
    },

    onEvent(event, data) {
        const self = this;
        switch (event) {
            case "loadingData":
                self.node.active = true;
                break;

            case "dataLoadCompleted":
            case "weatherDataCompleted":
                self.node.active = false;
                break;
        }
    },
});
