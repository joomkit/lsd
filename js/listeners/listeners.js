//event slisteners for form changes that uodate forms and calculate actual and nrmalised values for design scenarios


$(function() {
  $('#AddComponent').click(function(e) {
    console.log("click");
    e.preventDefault();
    var row = 1;
    // addRow('dataTable');
    // var node = document.getElementById('template');
    // table.row.add(rowtemp         
    // ).draw(false);

    var template = $('#template')
      .clone()                        // CLONE THE TEMPLATE
      .attr('id', 'row' + (row++))  
      .attr('class', 'addedrow').fadeIn()    // MAKE THE ID UNIQUE
      .prependTo($('#dataTable tbody'))
      // .appendTo($('#dataTable tbody'))  // APPEND TO THE TABLE
      .show();                       // SHOW IT

      setTimeout(function(){
        template.removeClass('addedrow');
      },2000);
  });
});

// var addRowButton = document.querySelector("#AddComponent");
// addRowButton.addEventListener("click", function(){
//   addRow('dataTable');
// });


function addRow(tableID) {
  // Get a reference to the table
  let tableRef = document.getElementById(tableID);

  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // // Insert a cell in the row at index 0
  // let newCell = newRow.insertCell(0);

  // // Append a text node to the cell
  // let newText = document.createTextNode('New bottom row');
  // newCell.appendChild(newText);
}

// select chnage listener
// $('select').on('change', function (e) {
//   var optionSelected = $("option:selected", this);
//   var valueSelected = this.value;
//   console.log(valueSelected);
//   console.log(data);
// });
// // Call addRow() with the table's ID

function populatePartsList(valueSelected){
  var select = $('#parts');

        var listitems = '';
        
        for(i = 0; i< partNames.length; i++){      
          console.log(partNames.componentName);
            listitems += '<option value=' + partNames.componentName + '>' + partNames.componentName + '</option>';
        };
        
       
}


// design1TextInput.addEventListener('change', design1TextInputChange);
// design1SelectInput.addEventListener('change', design1SelectInputChange);
// design2TextInput.addEventListener('change', design2TextInputChange);
// design2SelectInput.addEventListener('change', design2SelectInputChange);
// design3TextInput.addEventListener('change', design3TextInputChange);
// design3SelectInput.addEventListener('change', design3SelectInputChange);
function design1TextInputChange(e) 
{
  console.log("design1TextInputChange");
  this.dataset.design1CarbonAbsolute = removeExponent((partSelected.dataset.partCarbonEmission * this.value));
  this.dataset.design1ToxicityAbsolute = removeExponent((partSelected.dataset.partHumanToxicity * this.value));
  $('td.design1-cell .raw .ca').text("a: " + this.dataset.design1CarbonAbsolute);
  
  calcCarbonDesign1Normalisers();
  $('td.design1-cell .raw .cn').text("n: " + d2Normaliser.value);
}

function design2TextInputChange(e) 
{
  console.log("design2TextInputChange");
  this.dataset.design2CarbonAbsolute = removeExponent((partSelected.dataset.partCarbonEmission * this.value));
  this.dataset.design2ToxicityAbsolute = removeExponent((partSelected.dataset.partHumanToxicity * this.value));
  $('td.design2-cell .raw .ca').text("a: " + this.dataset.design2CarbonAbsolute);
  
  calcCarbonDesign2Normalisers();

  $('td.design2-cell .raw .cn').text("n: " + d2Normaliser.value);
}
function design3TextInputChange(e) 
{
  console.log("design3TextInputChange");
  this.dataset.design3CarbonAbsolute = removeExponent((partSelected.dataset.partCarbonEmission * this.value));
  this.dataset.design3ToxicityAbsolute = removeExponent((partSelected.dataset.partHumanToxicity * this.value));
  
  //"abs " + (partSelected.dataset.partHumanToxicity * this.value);
  var testN = removeExponent((partSelected.dataset.partHumanToxicity * this.value));

  $('td.design3-cell .raw .ca').text("a: " + this.dataset.design3CarbonAbsolute);
  calcCarbonDesign3Normalisers();
  $('td.design3-cell .raw .cn').text("n: " + d3Normaliser.value);
}

//select listener function calcs
// function design1SelectInputChange(e) {
//   console.log("design1SelectInputChange");
//   console.log(partSelected.dataset.partCarbonEmission);
//   this.dataset.design1CarbonAbsolute = (partSelected.dataset.partCarbonEmission * this.value);
//   this.dataset.design1ToxicityAbsolute = (partSelected.dataset.partHumanToxicity * this.value);
  
// }
// function design2SelectInputChange(e) {
//   console.log("design2SelectInputChange");
//   this.dataset.design2CarbonAbsolute = (partSelected.dataset.partCarbonEmission * this.value);
//   this.dataset.design2ToxicityAbsolute = (partSelected.dataset.partHumanToxicity * this.value);
// }
// function design3SelectInputChange(e) {
//   console.log("design3SelectInputChange");
//   this.dataset.design3CarbonAbsolute = (partSelected.dataset.partCarbonEmission * this.value);
//   this.dataset.design3ToxicityAbsolute = (partSelected.dataset.partHumanToxicity * this.value);
// }

/* carbon normalised 
 * = carbon absolute divided by the sum total of all carbon absolutes for design
*/
function calcCarbonDesign1Normalisers()
{
  //get all elements of carbon raw values 
  var design1Element =  document.querySelectorAll(".design1");
  
  var total = 0;
  // loop thru absolute carbon values and total them up
  for(i = 0; i< design1Element.length; i++){  
    total += parseFloat(design1Element[i].dataset.design1CarbonAbsolute);
  }
  //store normaliser 
  d1Normaliser.dataset.d1normaliser = total;
  d1Normaliser.value = total;

  //show  the divisor
  $('#d1Normaliser').text("Normal divisor:" + total);
  
  console.log(typeof parseIntd1NormaliserValue);

  //now loop thru all design 1 elements and set the carbon normalised value
  for(i = 0; i< design1Element.length; i++){  
    carbAbsolute = design1Element[i].dataset.design1CarbonAbsolute;
    carbNormaliser = Math.floor(d1NormaliserValue);  
    design1Element[i].dataset.design1CarbonNormalised = (design1Element[i].dataset.design1CarbonAbsolute /  d1Normaliser.value) ; //(parseFloat(design1Element[i].dataset.design1CarbonAbsolute) / parseFloat(d1NormaliserValue) )
  }
}

function calcCarbonDesign2Normalisers()
{
  //get all elements of carbon raw values 
  var design2Element =  document.querySelectorAll(".design2");
  
  var total = 0;
  // loop thru absolute carbon values and total them up
  for(i = 0; i< design2Element.length; i++){  
    total += parseFloat(design2Element[i].dataset.design2CarbonAbsolute);
  }
  //store normaliser 
  d2Normaliser.dataset.d2normaliser = total;
  d2Normaliser.value = total;

  //show  the divisor
  $('#d2Normaliser').text("Normal divisor:" + total);
  
  console.log(typeof parseIntd2NormaliserValue);

  //now loop thru all design 2 elements and set the carbon normalised value
  for(i = 0; i< design2Element.length; i++){  
    carbAbsolute = design2Element[i].dataset.design2CarbonAbsolute;
    carbNormaliser = Math.floor(d2NormaliserValue);    
    design2Element[i].dataset.design2CarbonNormalised = (design2Element[i].dataset.design2CarbonAbsolute /  d2Normaliser.value) ; //(parseFloat(design2Element[i].dataset.design2CarbonAbsolute) / parseFloat(d2NormaliserValue) )
  }
}

function calcCarbonDesign3Normalisers()
{
  //get all elements of carbon raw values 
  var design3Element =  document.querySelectorAll(".design3");
  
  var total = 0;
  // loop thru absolute carbon values and total them up
  for(i = 0; i< design3Element.length; i++){  
    console.log(typeof design3Element[i].dataset.design3CarbonAbsolute)
    console.log(typeof parseFloat(design3Element[i].dataset.design3CarbonAbsolute));
    total += parseFloat(design3Element[i].dataset.design3CarbonAbsolute);
  }
  //store normaliser 
  console.log("total = " + total);

  d3Normaliser.dataset.d3normaliser = total;
  d3Normaliser.value = total;

  //show  the divisor
  $('#d3Normaliser').text("Normal divisor:" + total);
  
  console.log(typeof parseIntd3NormaliserValue);

  //now loop thru all design 3 elements and set the carbon normalised value
  for(i = 0; i< design3Element.length; i++){  
    carbAbsolute = design3Element[i].dataset.design3CarbonAbsolute;
    carbNormaliser = Math.floor(d3NormaliserValue);
    console.log(carbAbsolute);
    console.log(typeof carbAbsolute);
    console.log(carbNormaliser);
    console.log(typeof carbNormaliser); 
    
    design3Element[i].dataset.design3CarbonNormalised = (design3Element[i].dataset.design3CarbonAbsolute /  d3Normaliser.value) ; //(parseFloat(design3Element[i].dataset.design3CarbonAbsolute) / parseFloat(d3NormaliserValue) )
  }
}

function removeExponent(value) {
  // if value is not a number try to convert it to number
  if (typeof value !== "number") {
      value = parseFloat(value);

      // after convert, if value is not a number return empty string
      if (isNaN(value)) {
          return "";
      }
  }

  var sign;
  var e;

  // if value is negative, save "-" in sign variable and calculate the absolute value
  if (value < 0) {
      sign = "-";
      value = Math.abs(value);
  }
  else {
      sign = "";
  }

  // if value is between 0 and 1
  if (value < 1.0) {
      // get e value
      e = parseInt(value.toString().split('e-')[1]);

      // if value is exponential convert it to non exponential
      if (e) {
          value *= Math.pow(10, e - 1);
          value = '0.' + (new Array(e)).join('0') + value.toString().substring(2);
      }
  }
  else {
      // get e value
      e = parseInt(value.toString().split('e+')[1]);

      // if value is exponential convert it to non exponential
      if (e) {
          value /= Math.pow(10, e);
          value += (new Array(e + 1)).join('0');
      }
  }

  // if value has negative sign, add to it
  return sign + value;
}

/* 
 * toggle raw data
 */
document.getElementById('switch').addEventListener('click', function() {

  var rawDataElement =  document.querySelectorAll(".raw");
  
  if (this.classList.contains('off')) {
    // switch on
    this.classList.remove('off');
    this.classList.add('on');
    for(i = 0; i< rawDataElement.length; i++)
    { 
      rawDataElement[i].style.display = 'block';
    }
    //off.classList.add('hide');
    // on.classList.add('show');
  } else {
    // switch off
    this.classList.add('off');
    this.classList.remove('on');
    for(i = 0; i< rawDataElement.length; i++)
    { 
      rawDataElement[i].style.display = 'none';  
    }
  }
});


$('#dataTable').on('mouseover mouseout', '.dosomething', function(){
  // what you want to happen when mouseover and mouseout 
  // occurs on elements that match '.dosomething'
});

//d1Normaliser.dataset.d1normaliser = "10000"
// console.log(d1Normaliser.dataset.d1normaliser);
//   // alert("normski: "+d1NormaliserValue);

//   s  = "6.3858779999999995e-12";
  

//   e = removeExponent(s);
  
//   console.log("toNonExponential " + e);
//   // d = parseInt(s);//, NumberStyles.Float);
//   console.log(partSelected);

  