cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;
        EventManager.register(self);
        self.reset();
    },

    onEvent(event, data) {
        const self = this;

        switch (event) {
            case "weatherDataCompleted":
                self.setData(data);
                break;

            case "backToList":
                self.reset();
                break;
        }
    },

    setData(weatherData) {},

    reset() {},
});
