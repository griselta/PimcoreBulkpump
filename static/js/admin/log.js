/**
 * Created by bas on 12/8/15.
 */

pimcore.registerNS('pimcore.plugin.CsvImport.admin.logClass');
pimcore.plugin.CsvImport.admin.logClass = Class.create({

    triggerImport: function (profileId) {
        //    Ext.MessageBox.show({
        //        msg:            t('importing_data_please_wait'),
        //        progressText:   t('importing'),
        //        width:          300,
        //        wait:           true,
        //        waitConfig: {
        //            interval: 200
        //        },
        //        icon:           'pimcore_icon_loading', //custom class in msg-box.html
        //        animEl:         'mb7'
        //    });
        //    var onDoneAction = function (response) {
        //        Ext.MessageBox.hide();
        //        var data            = Ext.util.JSON.decode(response.responseText),
        //            title           = data.success ? t('done') : t('error'),
        //            fileConfigTabs  = Ext.getCmp('csv_importer_profile_config_tabs'),
        //            profileLogsGrid = Ext.getCmp('importer_grid_profile_logs');
        //
        //        profileLogsGrid.getStore().load({
        //            params: {profileId: profileId}
        //        });
        //
        //        pimcore.helpers.showNotification(title, t(data.message));
        //        fileConfigTabs.setActiveTab(1);
        //    };
//        Ext.Ajax.on('requestcomplete', function(conn, response, options) {
//            Ext.Msg.alert(response.responseText);
//        });

        Ext.Ajax.request({
            url: '/plugin/PimcoreBulkpump/log/import',
            //success: onDoneAction,
            //failure: onDoneAction,
            params: {
                profileId: profileId
            },
            success: function(response, opts) {
                var executedResult  = {};
                try {
                    var obj = Ext.decode(response.responseText);
                    executedResult.title = t("csv_import_result_title");
                    switch(obj.message)
                    {
                        case 'run succesfull':
                            executedResult.body = t("csv_import_result_message");
                            break;
                        default:
                            executedResult.body = obj.message;
                            break;
                    }

                }
                catch(err) {
                    executedResult.title = t("csv_import_result_title_error");
                    executedResult.body = response.responseText;
                }
                //console.dir(obj);
                Ext.Msg.minWidth = 860;
                Ext.Msg.alert(executedResult.title, executedResult.body);
            },
        })
    }
});

var logClass = new pimcore.plugin.CsvImport.admin.logClass();
