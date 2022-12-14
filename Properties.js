define([], function () {
    return {
        type: "items",
        component: "accordion",
        items: {            
            settings: {
                uses: "settings",
                items: {
                    Options: {
                        label: "Settings",
                        type: "items",
                        items: {
                            TitleBool : {
                                ref : "titlebool",
                                type : "boolean",
                                component : "switch",
                                label : "Add title detail",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true                                
                            },
                            MyButton:{
                                label:'My button',
                                component : "button",
                                id :'KvantExportBtn',
                                class:'KvantExport-btn',
                                action: function(data){
                                    alert('Test');
                                }
                            },
                            SubtitleBool : {
                                ref : "subtitlebool",
                                type : "boolean",
                                component : "switch",
                                label : "Add subtitle detail",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true,
                                show : function(data) {
                                    return data.titlebool;
                                }                              
                            },
                            FooterBool : {
                                ref : "footerbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add footer detail",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true                                
                            },
                            SelectionsBool : {
                                ref : "selectionsbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add current selections",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true                                
                            },
                            IconBackground: {
                                ref: "iconbackground",
                                label: "Icon background",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#7b7a78"  
                                }                                
                            },
                            IconColor: {
                                ref: "iconcolor",
                                label: "Icon color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#FFF"  
                                }                                
                            }
                        }                         
                    },
                    about: {
                        component: "items",
                        label: "About",
                        items: {
                            header: {
                                label: "KvantExport Extension",
                                style: "header",
                                component: "text"
                            },
                            paragraph1: {
                                label: "KvantExport extension is deployed to allow a right data export preserving the whole look&feel.",
                                component: "text"
                            },
                            paragraph2: {
                                label: "KvantExport is an extension created by Uali Kabden, offered under MIT License.",
                                component: "text"
                            }
                        }
                    }
                }
            }            
        }
    }
});