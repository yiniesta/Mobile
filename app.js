/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({

    requires: [
        'Ext.MessageBox'
    ],
    models: [
        'User',
        'Task',
        'Shared',
        'Offline',
        'OfflineDetail',
        'SelfMenu',
        'WithdrawalHistory'
    ],
    stores: [
        'ProvinceStore',
        'CityStore',
        'UserStore',
        'TaskStore',
        'SharedStore',
        'SelfMenuStore',
        'OfflineStore',
        'WithdrawalHistoryStore'
    ],
    views: [
        'LoginForm',
        'RegisterForm',
        'MainPanel',
        'self.MyPassword',
        'task.TaskDetailPanel',
        'self.MyInfo',
        'shared.SharedUploadPanel',
        'offline.OfflineDetailPanel',
        'self.WithdrawalHistory',
        'self.Withdrawal',
        'ForgetFrom'
    ],
    controllers: [
        'UserController',
        'TaskController',
        'SelfController',
        'SharedController',
        'OfflineController'
    ],
    name: 'mobile',

    launch: function() {
        Ext.fly('appLoadingIndicator').destroy();

        //document.addEventListener("deviceready", this.mainLaunch, false);

        var dataStore = Ext.getStore('UserStore');
        dataStore.load();
        var user = dataStore.getAt(0);
        if (user) {
            var loginSuccess = function(resp, ops) {
                var loginResult = resp.responseText;
                if(loginResult === 'failure'){
                    Ext.create('mobile.view.LoginForm', {fullscreen: true});
                } else {
                    Ext.create('mobile.view.MainPanel', {fullscreen: true});
                }
            };

            var loginFailure = function(resp, ops) {
                Ext.create('mobile.view.LoginForm', {fullscreen: true});
            };

            // 自动登录
            Ext.Ajax.request({
                url: "/weixin/mobile/j_spring_security_check",
                params: {"j_username":user.data.username,"j_password":user.data.password},
                success: loginSuccess,
                failure: loginFailure
            });

        } else {
            Ext.create('mobile.view.LoginForm', {fullscreen: true});
        }
    },

    mainLaunch: function() {
        // if (!device || !this.launched){
        //     return;
        // }
        alert('mainLaunch');

    }

});
