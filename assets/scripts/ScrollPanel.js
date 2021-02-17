const SelectCityItem = require("SelectCityItem");
const TOKEN = "pk.37c4242d7c0d0e5d05916c37bebe8bcd";

cc.Class({
    extends: cc.Component,

    properties: {
        prefabItem: cc.Prefab,
        listCity: cc.JsonAsset,
        container: cc.Node,
    },

    start() {
        var self = this;
        self.showListCities();
    },

    showListCities(listCities) {
        var self = this;
        function success(pos) {
			EventManager.publish('dataLoadCompleted');
            var crd = pos.coords;
            var lat = crd.latitude.toString();
            var lng = crd.longitude.toString();
            var coordinates = [lat, lng];
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            self.getCity(coordinates);
            return;
        }

        function error(err) {
			EventManager.publish('dataLoadCompleted');
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

		EventManager.publish('loadingData');
        navigator.geolocation.getCurrentPosition(success, error);
    },

    getCity(coordinates) {
        var self = this;

        var lat = coordinates[0];
        var lng = coordinates[1];
        var xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `https://us1.locationiq.com/v1/reverse.php?key=${TOKEN}&lat=${lat}&lon=${lng}&format=json`,
            true
        );
        xhr.send();
		EventManager.publish('loadingData');
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
				EventManager.publish('dataLoadCompleted');
                var response = JSON.parse(xhr.responseText);
                var city = response.address.city ?? response.address.state;
                self.listCity.json.unshift(city);
				self.createScrollItems(self.listCity.json)
                return;
            }
        }
    },

    createScrollItems(cities) {
        var self = this;

        for (let index = 0; index < cities.length; index++) {
            const city = cities[index];
            const newNode = cc.instantiate(self.prefabItem.data);
            newNode.parent = self.container;
            const item = newNode.getComponent(SelectCityItem);
            item.setCity(city);
        }
    },
});
