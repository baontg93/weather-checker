const SelectCityItem = require('SelectCityItem');

cc.Node.prototype.GetWorldPosition = function () {
    var position = this.position;
    if (this.parent !== null) {
        return this.parent.convertToWorldSpaceAR(position);
    }
    return position;
};

cc.Class({
    extends: cc.ScrollView,

    properties: {
        view: cc.Node,
        pool: cc.Node,
        prefab: cc.Prefab,
        spacing: 0,
        excessObjectQuantity: 4,
        buttonMoveToTop: cc.Node,
    },

    onLoad() {
        var self = this;
        self.itemHeight = self.prefab.data.height;
        self.maxQuantity = Math.round(self.view.height / (self.itemHeight + self.spacing));
        self.topItem = null;
        self.bottomItem = null;
        self.topCoordinate = 0;
        self.bottomCoordinate = 0;
        self.topIndex = 0;
        self.bottomIndex = 0;
        self.topSiblingIndex = 0;
        self.bottomSiblingIndex = 0;
        self.currentContentY = self.content.y;
        self.listItemInContainer = [];
        self.listItemInPool = [];
        self.arrCities = [];
        self.arrPositions = [];
        self.arrCurrentItem = [];
        if (self.buttonMoveToTop) {
            self.buttonMoveToTop.active = false;
            self.buttonMoveToTop.on('click', () => {
                self.stopAutoScroll();
                self.scrollToTop(1);
            });
        }
    },

    clear() {
        var self = this;
        self.stopAutoScroll();
        self.scrollToTop();
        while (self.listItemInContainer.length > 0) {
            var element = self.listItemInContainer.pop();
            self.despawn(element);
        }
        self.arrCities = [];
        self.listItemInContainer = [];
        self.arrCurrentItem = [];
        self.arrPositions = [];
    },

    initScrollView(arrCities) {
        var self = this;

        self.maxQuantity = Math.round(self.view.height / (self.itemHeight + self.spacing));
        self.clear();
        self.content.height = arrCities.length * (self.itemHeight + self.spacing);
        var totalQuantity = self.maxQuantity + self.excessObjectQuantity;
        var firstY = -self.itemHeight / 2 - self.spacing;
        for (var index = 0; index < arrCities.length; index++) {
            var city = arrCities[index];
            self.arrCities.push(city);
            self.arrPositions.push(new cc.Vec2(0, firstY - index * (self.itemHeight + self.spacing)));
            if (index < totalQuantity) {
                var item = self.getItem();
                item.position = self.arrPositions[index];
                var itemData = item.getComponent(SelectCityItem);
                itemData.setCity(city);
                self.arrCurrentItem.push(itemData);
                if (index == 0) {
                    self.topItem = item;
                    self.topIndex = index;
                    self.topSiblingIndex = index;
                    self.topCoordinate = item.GetWorldPosition().y + self.itemHeight * self.excessObjectQuantity / 2;
                } else if (index == (self.maxQuantity - 1)) {
                    self.bottomItem = item;
                    self.bottomCoordinate = item.GetWorldPosition().y - self.itemHeight * self.excessObjectQuantity / 2;
                } else if (index == (totalQuantity - 1)) {
                    self.bottomIndex = index;
                    self.bottomSiblingIndex = index;
                }
            }
        }

        self.buttonMoveToTop.active = arrCities.length > self.maxQuantity + self.excessObjectQuantity;
    },

    getItem() {
        var self = this;
        var nodeItem = null;
        if (self.listItemInPool.length > 0) {
            var nodeItem = self.listItemInPool.pop();
        } else {
            nodeItem = cc.instantiate(self.prefab);
        }
        nodeItem.active = true;
        nodeItem.parent = self.content;
        self.listItemInContainer.push(nodeItem);
        return nodeItem;
    },

    despawn(nodeItem) {
        var self = this;
        nodeItem.active = false;
        nodeItem.parent = self.pool;
        self.listItemInPool.push(nodeItem);
    },

    setContentPosition(position) {
        var self = this;
        self.updatePosition(position);
        self._super(position);
    },

    updatePosition(position) {
        var self = this;

        if (self.topItem == null || self.bottomItem == null || self.itemHeight == 0) {
            return;
        }
        if (self.arrCurrentItem && Math.abs(self.currentContentY - position.y) >= self.itemHeight) {
            if (position.y > self.currentContentY) {
                while (self.topItem.GetWorldPosition().y > self.topCoordinate && self.bottomIndex != self.arrCities.length - 1) {
                    self.topIndex++;
                    self.bottomIndex++;
                    self.topItem.position = self.arrPositions[self.bottomIndex];
                    self.topItem.setSiblingIndex(self.bottomSiblingIndex);
                    var itemData = self.topItem.getComponent(SelectCityItem);
                    itemData.setCity(self.arrCities[self.bottomIndex]);
                    self.topItem = self.content.children[self.topSiblingIndex];
                    self.bottomItem = self.content.children[self.bottomSiblingIndex];
                }
            }
            if (position.y < self.currentContentY) {
                while (self.bottomItem.GetWorldPosition().y < self.bottomCoordinate && self.topIndex != 0) {
                    self.topIndex--;
                    self.bottomIndex--;
                    self.bottomItem.position = self.arrPositions[self.topIndex];
                    self.bottomItem.setSiblingIndex(self.topSiblingIndex);
                    var itemData = self.bottomItem.getComponent(SelectCityItem);
                    itemData.setCity(self.arrCities[self.topIndex]);
                    self.topItem = self.content.children[self.topSiblingIndex];
                    self.bottomItem = self.content.children[self.bottomSiblingIndex];
                }
            }
            self.currentContentY = position.y;
        }
    }
});