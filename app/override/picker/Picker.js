Ext.define('mobile.override.picker.Picker', {
    override: 'Ext.picker.Picker',
    
    initialize: function() {
        this.callParent();
    },
    
    //Cancel->取消
    applyCancelButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: '取消'
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getCancelButton());
    },
    
    //Done->确定
    applyDoneButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                ui: 'action',
                align: 'right',
                text: '确定'
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getDoneButton());
    }
    
});