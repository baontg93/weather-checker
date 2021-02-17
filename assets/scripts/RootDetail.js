const API_KEY = "fc0264dd5bfabfb4ba0a44d060e99afe";

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
            case "selectCity":
                self.node.active = true;
                self.loadData(data);
                break;

            case "backToList":
                self.node.active = false;
                break;
        }
    },

    loadData(city) {
        var data = "";

        var xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        xhr.send(data);
		EventManager.publish('loadingData');
        xhr.onreadystatechange = processRequest;
        
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
				EventManager.publish('weatherDataCompleted', response);
                return;
            }
        }
    },
});
