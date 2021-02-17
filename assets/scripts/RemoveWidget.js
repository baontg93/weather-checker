cc.Class({
    extends: cc.Component,

    onLoad() {
        const self = this;

        if (cc.sys.isMobile == false) {
            let widget = self.node.getComponent(cc.Widget);
            widget.isAlignLeft = widget.isAlignRight = false;
            self.node.width = cc.view._designResolutionSize.width;
        }
    },
});
