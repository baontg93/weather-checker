cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;
        EventManager.register(self);
    },

    onEvent(event, data) {
        const self = this;

        switch (event) {
            case "weatherDataCompleted":
                self.reset();
                self.setData(data);
                break;

            case "backToList":
            case "selectCity":
                self.reset();
                break;
        }
    },

    setData(weatherData) { },

    reset() { },
});
