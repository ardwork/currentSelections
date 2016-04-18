////////////////////////////////////////////////////
//Version: 	1.0.0
//Author:  	Richard Byard
//Usage:	Current Selections
//Date:		13 April 2016
////////////////////////////////////////////////////
define( [
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
	
    function ( $, qlik, styleSheet) {
        'use strict';	
		//Inject Stylesheet into header of current document
		$( '<style>' ).html(styleSheet).appendTo( 'head' );
 
	 
	return {
			//Define the properties tab - these are defined in the properties.js file
//             definition: props,
			
			//Define the data properties - how many rows and columns to load.
//			 initialProperties: initProps,
			
			//Not sure if there are any other options available here.
			 snapshot: {cantTakeSnapshot: true
			 },
			
			
				
			//paint function creates the visualisation. - this one makes a very basic table with no selections etc.
            paint: function ( $element , layout ) {
			
			var app = qlik.currApp(this);

	
			
			var selections = app.getList("CurrentSelections", function(reply) {
	
				
			
				var mySelectedFields = reply.qSelectionObject.qSelections,
					mySelectedFieldsLength = mySelectedFields.length,
					html = '<table id="mySelections" class="qv-object-currentSelections"><tr><th>Field</th><th>Count</th><th>Values</th></tr>';
		
		
		
				for (var i = 0; i < mySelectedFieldsLength; i++){
					
					html+= '<tr><td>' + mySelectedFields[i].qField + '</td><td>' + mySelectedFields[i].qSelectedCount + ' of ' + mySelectedFields[i].qTotal + '</td><td>' + mySelectedFields[i].qSelected + '</td></tr>';
						
				}
		

				html += '</table>';
				
				
				
				$element.empty();
				$element.append(html);
				 
			  
					}
					
				  
			);



					
				
				
/* 				catch(err){
					$element.empty();
					$element.append('<div>Something went wrong: ' + err + '</div>'); 
				} */		
            }
        }
    }
);
