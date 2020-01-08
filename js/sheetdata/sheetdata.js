//api key
var key = 'AIzaSyA2jRvS1F2HOJrwCfV_Wd_E0GC2l7ImnFs';
    
// DATA SETTINGS
//set main data container from googlesheet
var data;

// sheet key
var spreadsheetID = "1DlfO9U5jPQWgL9edzvTKLsXRAPX1EmRvxyJnoYmPJvc";
  //var url = "https://sheets.googleapis.com/v4/spreadsheets/1DlfO9U5jPQWgL9edzvTKLsXRAPX1EmRvxyJnoYmPJvc/values:batchGet?ranges=Lists!A1:J32&majorDimension=COLUMNS&key=AIzaSyA2jRvS1F2HOJrwCfV_Wd_E0GC2l7ImnFs";
  //var url = "https://sheets.googleapis.com/v4/spreadsheets/1DlfO9U5jPQWgL9edzvTKLsXRAPX1EmRvxyJnoYmPJvc/values:batchGet?ranges=Lists!A1:J32&majorDimension=ROWS&key=AIzaSyA2jRvS1F2HOJrwCfV_Wd_E0GC2l7ImnFs";
  
  //sheet url public shareable
  // var url = "https://sheets.googleapis.com/v4/spreadsheets/1DlfO9U5jPQWgL9edzvTKLsXRAPX1EmRvxyJnoYmPJvc/values:batchGet?ranges=Data%20source!B1:J90&majorDimension=ROWS&key=AIzaSyA2jRvS1F2HOJrwCfV_Wd_E0GC2l7ImnFs";
  var urlAll = "https://sheets.googleapis.com/v4/spreadsheets/1lSgx0aXauWkvYdJ3n2Lynr8_t6tTnZhp1J8dUQQlmUU/values:batchGet?ranges=Data_source!A:G&majorDimension=ROWS&key=AIzaSyA2jRvS1F2HOJrwCfV_Wd_E0GC2l7ImnFs";

  var urlComponents = "https://sheets.googleapis.com/v4/spreadsheets/1lSgx0aXauWkvYdJ3n2Lynr8_t6tTnZhp1J8dUQQlmUU/values:batchGet?ranges=Data_source!$A:A&majorDimension=ROWS&key=AIzaSyA2jRvS1F2HOJrwCfV_Wd_E0GC2l7ImnFs";

//set column sheet labels
var sheetLabels = {
  componentType:      "Component Type",
  componentName:      "Component",
  componentMaterial:  "Material (Part Details)",
  componentUnit:  "Unit",
  carbonEmission:     "Carbon Emission (Kg CO2e) (PTCv)",
  humanToxicity:    "Human Toxicity (CTUh) (PTTv)"
}

//set containers
var uniqueComponentTypeNames = [];
var uniqueComponentNames = [];
var partValues = [];
var unit;
var activerow;
var partSelected; // select elemnt selected for part or type

//setup normaliser container variables

var design1 = { normalised: "", actual: ""};
var design2 = { normalised: "", actual: ""};
var design3 = { normalised: "", actual: ""};

//get and set carbon
var d1CaNormaliser = document.querySelector('#d1CaNormaliser');
var d1CaNormaliserValue = d1CaNormaliser.dataset.d1normaliser;

var d2CaNormaliser = document.querySelector('#d2CaNormaliser');
var d2CaNormaliserValue = d2CaNormaliser.dataset.d2normaliser;

var d3CaNormaliser = document.querySelector('#d3CaNormaliser');
var d3CaNormaliserValue = d3CaNormaliser.dataset.d3normaliser;

//get and set Tx
var d1TaNormaliser = document.querySelector('#d1TaNormaliser');
var d1TaNormaliserValue = d1TaNormaliser.dataset.d1normaliser;

var d2TaNormaliser = document.querySelector('#d2TaNormaliser');
var d2TaNormaliserValue = d2TaNormaliser.dataset.d2normaliser;

var d3TaNormaliser = document.querySelector('#d3TaNormaliser');
var d3TaNormaliserValue = d3TaNormaliser.dataset.d3normaliser;

//end normalisers


    var jqxhr = $.get(urlAll)
  
      .done(function(sheet) {
        // alert( "success" );
        //  console.log(data);
         
        sheetdata = sheet.valueRanges[0].values;
        
        // console.log(JSON.parse(data));
        data = getJsonArrayFromData(sheetdata);
        getComponentTypes(data);
        // getComponentParts(data);
       
        // var chaindata = data.valueRanges[0].values;
      })
      .fail(function() {
        alert( "error" );
      })
      .always(function() {
        // alert( "complete" );
      });
    
    


 // *****************************
 // GET COMPONENT DATA FROM SHEET  //   
 // *****************************
function getComponentTypes(data)
{

  uniqueComponentTypeNames = []; //already defined in global space?

  for(i = 0; i< data.length; i++){    
    if(uniqueComponentTypeNames.indexOf(data[i][sheetLabels.componentType]) === -1){ 
      uniqueComponentTypeNames.push(data[i][sheetLabels.componentType]);    
    }        
  }
  populateComponentSelect(uniqueComponentTypeNames);  
} 

//
//**** load initial component types ***
//
function populateComponentSelect(uniqueNames)
{
  // var select = $('#component');
  var select = $('.component-type');
  var listitems = '';
  
  $.each(uniqueNames, function(key, value){
    console.log(key,value);
    listitems += '<option value="' + value + '">' + value + '</option>';
  });
  select.append(listitems);
  //console.log(data);
}    

function populatePartSelect(componentName,partsTargetSelect)
{

  var select = partsTargetSelect.empty();
  var listitems = '<option>Please Select</option>';
  var partNames = [];
  var uniqueNames = [];
  
  console.log("chosen comptype = " + componentName);

  for(i = 0; i< data.length; i++){   
    
    if(data[i][sheetLabels.componentType] === ''+componentName+''){   
      //  console.log(data[i][sheetLabels.componentName]);
      partNames.push({
        componentType:data[i][sheetLabels.componentType],
        componentName:data[i][sheetLabels.componentName],          
        componentUnit:data[i][sheetLabels.componentUnit],
        carbonEmission:data[i][sheetLabels.carbonEmission],
        humanToxicity:data[i][sheetLabels.humanToxicity]
      });       
    }
  }
  
  $.each(partNames, function(key, value){
    // console.log(this.componentName);
    listitems += '<option value="' + this.componentName + '">' + this.componentName + '</option>';
  });
 
  select.append(listitems);   
}

function getPartValues(valueSelected)
{
  partValues = [];
  console.log(data);
  for(i = 0; i< data.length; i++){   
    
    if(data[i][sheetLabels.componentName] === ''+valueSelected+''){   
       
      partValues.push({
        componentType:data[i][sheetLabels.componentType],
        componentName:data[i][sheetLabels.componentName],          
        componentUnit:data[i][sheetLabels.componentUnit],
        carbonEmission:data[i][sheetLabels.carbonEmission],
        humanToxicity:data[i][sheetLabels.humanToxicity]
      });       
    }
  }
  partValues = partValues[0];
  return partValues; 
}

function setUnitTemplate(unit,activerow)
{

  //screen here for milligrams with specific value
  //eg if unit contains 'm' then treat as input like grams?
  console.log('setunittmp');
  switch(unit) {
    case 'pcs':
      // code block
      cells = activerow.find('td.design');
      for(i = 0; i< cells.length; i++){  
        cells[i].innerHTML = getTemplateGrams(unit,i);
      }
    break;
    case 'g':
      // code block
      cells = activerow.find('td.design');
      for(i = 0; i< cells.length; i++){  
        cells[i].innerHTML = getTemplateGrams(unit,i);
      }
      break;
    case 'm':
        // code block
        cells = activerow.find('td.design');
        for(i = 0; i< cells.length; i++){  
          cells[i].innerHTML = getTemplateGrams(unit,i);
        }
        break;
    default:
      // code block
  }
}

function getTemplatePcs(unit,i)
{
  //start at 1
  i = i + 1;
  var pcsTemplate = '<div class="input-group mb-3">' +
                      '<select class="custom-select design'+i+'" '+
                      'data-design'+i+'-carbon-normalised="" '+ 
                      'data-design'+i+'-carbon-absolute="" ' +
                      'data-design'+i+'-toxicity-normalised="" ' +
                      'data-design'+i+'-toxicity-absolute="" >' +
                        '<option selected>Choose...</option>' +
                        '<option value="1">One</option>' +
                        '<option value="2">Two</option>' +
                        '<option value="3">Three</option>' +
                      '</select>' +
                      '<div class="input-group-append">' +
                        '<label class="input-group-text unit-label" for="unit">-</label>' +
                      '</div>' +
                    '</div>' +
                    '<div class="col-12 raw small"></div>';                                
  return pcsTemplate;
}

function getTemplateGrams(unit,i)
{
  //start at 1
  i = i + 1;
  var gramsTemplate = '<div class="input-group mb-3">' +
                        '<input type="text" class="form-control design'+i+'" '+
                        'data-design'+i+'-carbon-normalised="" '+ 
                        'data-design'+i+'-carbon-absolute="" ' +
                        'data-design'+i+'-toxicity-normalised="" ' +
                        'data-design'+i+'-toxicity-absolute="" >' +
                        '<div class="input-group-append">' +
                        '<span class="input-group-text">' + unit + '</span>' +
                        '</div>'+
                      '</div>' +
                      '<div class="col-12 raw small">' + 
                      '<div class="alert alert-primary ca" role="alert"></div>' +
                      '<div class="alert alert-primary cn" role="alert"></div>' +
                      '<div class="alert alert-primary tx" role="alert"></div>' +
                      '<div class="alert alert-primary tn" role="alert"></div>' +
                      '</div>';
  return gramsTemplate;                      
}

/************************************************************************** 
 * SETS UP DESIGN TEMPLATES PER COMPONENT PART TYPES 
 * SETS UP ACTIVE ROW
 * SETS UP DATA ATTRIBUTES FROM GLOBAL PARTVALUES DECLARED IN getPartValues()
 *****************************************************************************/
function setUnitData(optionSelected)
{
      // unitTargetSelect = $(this).closest('tr').find('.unit-label').addClass('gotcha').removeAttr('disabled');
      
      // set text of unit cell
      $(optionSelected).closest('tr').find('.unit-cell').text(partValues.componentUnit);

      //find unit for part type and active row
      unit = partValues.componentUnit;
      activerow = $(optionSelected).closest('tr')

      //inject templates
      setUnitTemplate(unit,activerow);
      
      //inject data attributes
      addDataAttributes(activerow, partValues);
      //unitTargetSelect  = activerow.find('.unit-label').addClass('cellBg');

}

// **** ADD VALUES TO DATA-ATTIRBUTES FOR EACH DESIGN CHOICE
function addDataAttributes(activerow, partValues)
{
    // design1.actual = partValues."design1";
}

//needs to be a listener?
function createNormaliser()
{

}

// **** THE BIG SELECT CHANGE LISTENER ****
$(document).on('change', 'select', function (e) 
{
  optionSelected = $("option:selected", this);
  var valueSelected = this.value;
  var selectClass = this.className;
  

    //if component type
    if(selectClass.indexOf('component-type') !== -1){
      // run parts look up   
      partsTargetSelect = $(this).closest('td').next('td').find('select').addClass('gotcha').removeAttr('disabled');
      //add parts list for the chosen component type
      populatePartSelect(valueSelected,partsTargetSelect);
    }

    // if part select is selected then get values and populate to data holders
    if(selectClass.indexOf('part') !== -1){
      // run parts look up 
      // console.log("part selected update units");
      //get part values an retunrs global variable partValues
      getPartValues(valueSelected);
      //var partSelect = 
      // partsTargetSelect = $(this).closest('td').next('td').find('select').addClass('gotcha').removeAttr('disabled');
      // populatePartSelect(valueSelected,partsTargetSelect);

      //set this part selects data attributes with carbon and toxicity values 
      this.dataset.partCarbonEmission = partValues.carbonEmission;
      this.dataset.partHumanToxicity = partValues.humanToxicity;
      
      //add UI template elements first
      setUnitData(optionSelected);

      //set dynamic calculator listener elements based on partValues.componentUnit
      unit = partValues.componentUnit;
      partSelected = this;
      
      setListeners(unit,partSelected);
    }
});

function setListeners(unit,optionSelected)
{
  switch(unit) {
    case 'oldpcs': //select boxes
    console.log('pcs');
      // set vars from dynamic elements
      var design1SelectInput = document.querySelector('select.design1');
      var design2SelectInput = document.querySelector('select.design2');
      var design3SelectInput = document.querySelector('select.design3');

      // design1SelectInput.addEventListener('change', design1SelectInputChange);
      design1SelectInput.oninput = design1SelectInputChange;
      design2SelectInput.oninput = design2SelectInputChange;
      design3SelectInput.oninput = design3SelectInputChange;
  
    break;
    case 'pcs': 
    case 'm':
    case'g':
      console.log('m or g');
      // set vars from dynamic elements
      var design1TextInput = document.querySelector('input.design1');
      var design2TextInput = document.querySelector('input.design2');
      var design3TextInput = document.querySelector('input.design3');
      
      //add listener functions
      // design1TextInput.addEventListener('change', design1TextInputChange);
      design1TextInput.oninput = design1TextInputChange;
      design2TextInput.oninput = design2TextInputChange;
      design3TextInput.oninput = design3TextInputChange;
    break;
  }
}




// utilitiy functions

//converts sheets data into more useful object
function getJsonArrayFromData(data)
{
    
  var obj = {};
  var result = [];
  var headers = data[0];
  var cols = headers.length;
  var row = [];

  for (var i = 1, l = data.length; i < l; i++)
  {
    // get a row to fill the object
    row = data[i];
    // clear object
    obj = {};
    for (var col = 0; col < cols; col++) 
    {
      // fill object with new values
      obj[headers[col]] = row[col];    
    }
    // add object in a final result
    result.push(obj);  
  }
  
  // var str = JSON.stringify(result, undefined, 9); // spacing level = 2
  // output(syntaxHighlight(str));
  return result;  
}

function output(inp) 
{
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

function syntaxHighlight(json) 
{
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}