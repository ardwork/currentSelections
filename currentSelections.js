////////////////////////////////////////////////////
//Version: 	1.1.0
//Author:  	Richard Byard
//Author:   Tom Jans
//Usage:	Current Selections
//Date:		18 May 2016
////////////////////////////////////////////////////

// Array of field to label translations
// If a field matches the field parameter than it will be replaced with the label parameter.
var fieldsTranslations = [{
    Label: "",
    Field: ""
}];

var mySelectedFields; // Global selected fields
var app; // Global app

define([
        // Load the properties.js file using requireJS
        // Note: If you load .js files, omit the file extension, otherwhise
        // requireJS will not load it correctly
        'jquery',
        'qlik',
        //       './properties/properties',
        //		'./properties/initialProperties',
        /***********************
        This is used to reference specific CSS V2.0 upwards.
        QlikSense set the CSS class qv-object-[extension name] on your visualizations
        and your CSS rules should be prefixed with that.
        ************************/
        'css!./currentSelections.css'
    ],
    function($, qlik, styleSheet) {
        'use strict';
        //Inject Stylesheet into header of current document
        $('<style>').html(styleSheet).appendTo('head');
        return {
            //Define the properties tab - these are defined in the properties.js file
            //             definition: props,

            //Define the data properties - how many rows and columns to load.
            //			 initialProperties: initProps,

            //Not sure if there are any other options available here.
            snapshot: {
                cantTakeSnapshot: true
            },
            //paint function creates the visualisation. - this one makes a very basic table with no selections etc.
            paint: function($element, layout) {
                app = qlik.currApp(this);

                var selectionState = app.selectionState;
                var selections = app.getList("CurrentSelections", function(reply) {
                    mySelectedFields = reply.qSelectionObject.qSelections;
                    var mySelectedFieldsLength = mySelectedFields.length,
                        html = "";

                    html += '<table id="mySelections" class="qv-object-currentSelections"><tr><th>Field</th><th>Count</th><th>Values</th></tr>';
                    for (var i = 0; i < mySelectedFieldsLength; i++) {
                        html += "<tr onclick='removeMySelection(" + i + ");'><td>" + translateField(mySelectedFields[i].qField) + '</td><td>' + mySelectedFields[i].qSelectedCount + ' of ' + mySelectedFields[i].qTotal + '</td><td>' + mySelectedFields[i].qSelected + '</td></tr>';
                    }
                    html += '</table>';
                    $element.empty();
                    $element.append(html);
                });
                /* 				catch(err){
                					$element.empty();
                					$element.append('<div>Something went wrong: ' + err + '</div>');
                        } */
            }
        }
    }
);

function removeMySelection(index) {
    app.clearAll();
    var mySelectedFieldsLength = mySelectedFields.length;
    var selectedFields = mySelectedFields.slice();
    for (var i = 0; i < mySelectedFieldsLength; i++) {
        if (i == index) {
            continue;
        }
        var field = selectedFields[i].qField;
        var fieldSelectionInfoLength = selectedFields[i].qSelectedFieldSelectionInfo.length;
        var names = [];
        for (var j = 0; j < fieldSelectionInfoLength; j++) {
            var name = selectedFields[i].qSelectedFieldSelectionInfo[j].qName;
            if (isNaN(name)) {
                names[j] = name;
            } else {
                names[j] = parseInt(name);
            }
        }
        app.field(field).selectValues(names, false, true)
    }
}

function translateField(field) {
    var size = fieldsTranslations.length;
    for (var i = 0; i < size; i++) {
        if (fieldsTranslations[i].Field == field) {
            return fieldsTranslations[i].Label;
        }
    }
    return field;
}
