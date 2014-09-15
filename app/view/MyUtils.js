/*
 * File: app/view/MyUtils.js
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

Ext.define('mobile.view.MyUtils', {
    extend: 'Ext.Base',
    alias: 'widget.myutils',

    singleton: true,

    config: {
    },

    getUserInfo: function() {
        var dataStore = Ext.getStore('UserStore');
        dataStore.load();
        var user = dataStore.getAt(0);
        return user.data;

    },

    getConsumerId: function() {
        var user = this.getUsetInfo();
        return user.consumerId;

    },

    updateTaskCount: function() {
        // 取得tabBar中的shared对应的button
        var sharedTab = Ext.getCmp('mainPanel').getComponent('mainTabBar').getAt(1);
        var user = this.getUserInfo();

        Ext.Ajax.request({
            url: "/weixin/mobile/getTaskCount.htm",
            params: {"consumerId":user.consumerId},
            success: function(resp, ops) {
                var count = resp.responseText;
                if(count === '0')
                    sharedTab.setBadgeText('');
                else
                    sharedTab.setBadgeText(resp.responseText);
            }
        });

    },

    copyToClipBoard: function(content) {
        var clipBoardContent=content;
        if(window.clipboardData){
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", clipBoardContent);
        } else if(navigator.userAgent.indexOf("Opera") != -1){
            window.location = clipBoardContent;
        } else if (window.netscape){
             try{
                 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
             }catch (e){
                 alert("您的当前浏览器设置已关闭此功能！请按以下步骤开启此功能！/n新开一个浏览器，在浏览器地址栏输入'about:config'并回车。/n然后找到'signed.applets.codebase_principal_support'项，双击后设置为'true'。/n声明：本功能不会危极您计算机或数据的安全！");
             }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip) return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans) return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = clipBoardContent;
            str.data = copytext;
            trans.setTransferData("text/unicode",str,copytext.length*2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) return false;
            clip.setData(trans,null,clipid.kGlobalClipboard);
        }
        alert("已成功复制！");
        return true;
    }

});