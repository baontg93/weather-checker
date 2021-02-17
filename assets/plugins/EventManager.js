EventManager = {
    listEventHandler: [],
    queuePublishInfo: [],
    isPublishing: false,
    register: function (eventHandler) {
        var self = this;
        if (!self.listEventHandler.includes(eventHandler)) {
            self.listEventHandler.push(eventHandler);
        }
    },
    unregister: function (eventHandler) {
        var self = this;
        for (var index = 0; index < self.listEventHandler.length; index++) {
            var handler = self.listEventHandler[index];
            if (handler == eventHandler) {
                self.listEventHandler.splice(index, 1);
                break;
            }
        }
    },
    publish: function (eventID, objectParam) {
        var self = this;
        if (eventID == null) {
            cc.warn("eventID is undefined");
            return;
        }
        var newPublishInfo = {
            eventID: eventID,
            objectParam: objectParam
        }
        cc.log("%cEventManger.Publish:", "color:#FF8F00", newPublishInfo);
        self.queuePublishInfo.push(newPublishInfo);
        if (self.isPublishing) {
            return;
        }
        self.isPublishing = true;
        while (self.queuePublishInfo.length > 0) {
            var publishInfo = self.queuePublishInfo.shift();
            var listEventHandler = self.listEventHandler.slice();
            for (var index = 0; index < listEventHandler.length; index++) {
                var handler = listEventHandler[index];
                handler.onEvent(publishInfo.eventID, publishInfo.objectParam);
            }
        }
        self.isPublishing = false;
    },
}