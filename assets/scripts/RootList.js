const SmartScrollView = require('SmartScrollView');

const TOKEN = "pk.37c4242d7c0d0e5d05916c37bebe8bcd";


cc.Class({
    extends: cc.Component,

    properties: {
        listCity: cc.JsonAsset,
        listCityFull: cc.JsonAsset,
        smartScrollView: SmartScrollView,
    },

    onLoad() {
        const self = this;
        EventManager.register(self);
        self.node.active = true;
        self.city = null;
    },

    start() {
        const self = this;
        self.showListCities(self.listCity.json);
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

            case "resetListCity":
                self.showListCities(self.listCity.json);
                break;

            case "loadMoreCity":
                self.showListCities(self.listCityFull.json);
                break;
        }
    },

    showListCities(cities) {
        const self = this;

        cities = cities.slice();
        if (self.city == null) {
            self.getCity(self.showListCities.bind(self, cities));
            return;
        }

        cities.unshift(self.city);
        self.smartScrollView.initScrollView(cities);
    },

    getCity(callback) {
        const self = this;
        function success(pos) {
            EventManager.publish("dataLoadCompleted");
            var crd = pos.coords;
            var lat = crd.latitude.toString();
            var lng = crd.longitude.toString();
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://us1.locationiq.com/v1/reverse.php?key=${TOKEN}&lat=${lat}&lon=${lng}&format=json`, true);
            xhr.send();
            EventManager.publish("loadingData");
            xhr.onreadystatechange = processRequest;

            function processRequest(e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    EventManager.publish("dataLoadCompleted");
                    var response = JSON.parse(xhr.responseText);
                    self.city = response.address.city ?? response.address.state;
                    callback && callback();
                    return;
                }
            }
            return;
        }

        function error(err) {
            EventManager.publish("dataLoadCompleted");
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        EventManager.publish("loadingData");
        navigator.geolocation.getCurrentPosition(success, error);
    },
});
