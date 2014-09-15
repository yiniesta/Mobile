Ext.define('mobile.override.plugin.PullRefresh', {
    override: 'Ext.plugin.PullRefresh',
    
    initialize: function() {
        this.callParent();
    },

    fetchLatest: function() {
        var store = this.getList().getStore(),
            proxy = store.getProxy(),
            operation;

        //先清空原有数据，并设置页码为1
        store.removeAll();
        store.setCurrentPage(1);

        operation = Ext.create('Ext.data.Operation', {
            page: 1,
            start: 0,
            model: store.getModel(),
            limit: store.getPageSize(),
            action: 'read',
            sorters: store.getSorters(),
            filters: store.getRemoteFilter() ? store.getFilters() : []
        });

        proxy.read(operation, this.onLatestFetched, this);

        //更新上次刷新时间
        this.lastUpdated = new Date();
    }
});