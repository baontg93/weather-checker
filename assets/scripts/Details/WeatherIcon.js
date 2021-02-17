cc.Class({
    extends: require('DetailValue'),

    setData(data) {
        const self = this;
        let sprite = self.node.getComponent(cc.Sprite);
        self.loadImage(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, sprite, sprite.node)
    },
    
    loadImage (url, spriteTarget, rect) {
        cc.assetManager.loadRemote(url, function (err, texture) {
            if (err) {
                cc.error(err);
                return;
            }
            let textureRect = { x: 0, y: 0, width: texture.width, height: texture.height }
            let spriteFrame = new cc.SpriteFrame(texture, textureRect, false, null, textureRect);
            spriteTarget.spriteFrame = spriteFrame;
            let scale = Math.min(rect.width / texture.width, rect.height / texture.height);
            spriteTarget.node.width = texture.width * scale;
            spriteTarget.node.height = texture.height * scale;
        })
    },
    
    reset() {
        const self = this;
        let sprite = self.node.getComponent(cc.Sprite);
        sprite.spriteFrame = null;
    },
});
