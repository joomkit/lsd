//event slisteners for form changes that uodate forms and calculate actual and nrmalised values for design scenarios

// Add event listener to table
// delRowElement = document.querySelectorAll(".deleterow");
// delRowElement.addEventListener("click", function(event){

// });

/*
 * deletes row and updates dom by running all normalisers
 */
function deleteRow(row){
  var d = row.parentNode.parentNode.rowIndex;
  document.getElementById('dataTable').deleteRow(d);

    // update data
    calcDesign1Normalisers();
    calcDesign2Normalisers();
    calcDesign3Normalisers();
  
    //redraw charts?
}
function deleteRowOld(e)
{
  console.log("del row");
  // console.log(this);
  var row = delRowElement.closest('tr');
  //remove dom element
  // var elem = document.querySelector(activerow);
  row.parentNode.removeChild(elem);

  // update data
  calcDesign1Normalisers();
  calcDesign2Normalisers();
  calcDesign3Normalisers();

  //redraw charts?

}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function design1TextInputChange(e) 
{
  //set active partSelect from same row
  console.log(partSelected.dataset);
  //remove scientific notation
  this.dataset.design1CarbonAbsolute = removeExponent(partSelected.dataset.partCarbonEmission) * this.value;
  this.dataset.design1ToxicityAbsolute = removeExponent((partSelected.dataset.partHumanToxicity * this.value));
  
  console.log(this.dataset.design1CarbonNormalised);
  calcDesign1Normalisers();
  console.log(this.dataset.design1ToxicityNormalised);


}

function design2TextInputChange(e) 
{
  this.dataset.design2CarbonAbsolute = removeExponent((partSelected.dataset.partCarbonEmission * this.value));
  this.dataset.design2ToxicityAbsolute = removeExponent((partSelected.dataset.partHumanToxicity * this.value));
  
  calcDesign2Normalisers();

  this.closest('td').querySelector('.raw .ca').textContent = "Ca: " + this.dataset.design2CarbonAbsolute;
  this.closest('td').querySelector('.raw .ta').textContent = "Ta: " + this.dataset.design2ToxicityAbsolute;
  this.closest('td').querySelector('.raw .cn').textContent = 'Cn: '+ round(this.dataset.design2CarbonNormalised,2);
  this.closest('td').querySelector('.raw .tn').textContent = "Tn: " + round(this.dataset.design2ToxicityNormalised,2)
}
function design3TextInputChange(e) 
{
  //console.log("design3TextInputChange");
  this.dataset.design3CarbonAbsolute = removeExponent((partSelected.dataset.partCarbonEmission * this.value));
  this.dataset.design3ToxicityAbsolute = removeExponent((partSelected.dataset.partHumanToxicity * this.value));
  
  calcDesign3Normalisers();
  
  this.closest('td').querySelector('.raw .ca').textContent = "Ca: " + this.dataset.design3CarbonAbsolute;
  this.closest('td').querySelector('.raw .ta').textContent = "Ta: " + this.dataset.design3ToxicityAbsolute;
  this.closest('td').querySelector('.raw .cn').textContent = "Cn: " + round(this.dataset.design3CarbonNormalised,2);
  this.closest('td').querySelector('.raw .tn').textContent = "Tn: " + round(this.dataset.design3ToxicityNormalised,2);
}
/*
* Build chart data
*/
function buildChartData(El)
{
  
}


/* carbon normalised 
 * = carbon absolute divided by the sum total of all carbon absolutes for design
*/
function calcDesign1Normalisers()
{
  //get all elements of carbon raw values 
  var design1Element =  document.querySelectorAll(".design1");
  
  var totalCa = 0;
  var totalTa = 0;

  // TOTALs
  //loop thru absolute  values and total them up
  for(i = 0; i< design1Element.length; i++){  
    //totalCa += parseFloat(design1Element[i].dataset.design1CarbonAbsolute);
    totalCa += parseFloat(design1Element[i].dataset.design1CarbonAbsolute);
    totalTa += parseFloat(design1Element[i].dataset.design1ToxicityAbsolute);   
  }

  
  //remove scientic notation
  totalCa = removeExponent(totalCa);
  totalTa = removeExponent(totalTa);
 
  
  //store normaliser 
  //store in data attrinute
  d1CaNormaliser.dataset.d1normaliser = totalCa;
  d1TaNormaliser.dataset.d1normaliser = totalTa;
  
  //store in global scope
  d1CaNormaliserValue = totalCa;
  d1TaNormaliserValue = totalTa;

  console.log("Global stored Ca norm divisor =  " + totalCa);

  //show  the divisor
  $('#d1CaNormaliser').text("Ca norm divisor:" + totalCa);
  $('#d1TaNormaliser').text("Ta norm divisor:" + totalTa);

  //SET value
  //now loop thru all design 1 elements and set the  normalised values for carbon and Toxicitiy
  for(i = 0; i< design1Element.length; i++){  
    design1Element[i].dataset.design1CarbonNormalised = (design1Element[i].dataset.design1CarbonAbsolute / totalCa);
    design1Element[i].dataset.design1ToxicityNormalised = (design1Element[i].dataset.design1ToxicityAbsolute / totalTa);
    //set debug values
    design1Element[i].closest('td').querySelector('.raw .ca').textContent = "Ca: " + design1Element[i].dataset.design1CarbonAbsolute;
    design1Element[i].closest('td').querySelector('.raw .ta').textContent = "Ta: " + design1Element[i].dataset.design1ToxicityAbsolute;
    design1Element[i].closest('td').querySelector('.raw .cn').textContent = 'Cn: '+ round(design1Element[i].dataset.design1CarbonNormalised, 2);
    design1Element[i].closest('td').querySelector('.raw .tn').textContent = "Tn: " + round(design1Element[i].dataset.design1ToxicityNormalised, 2);
  }
  buildChartData()
}

function calcDesign2Normalisers()
{
  //get all elements of carbon raw values 
  var design2Element =  document.querySelectorAll(".design2");
  
  var totalCa = 0;
  var totalTa = 0;

  // TOTALs
  //loop thru absolute  values and total them up
  for(i = 0; i< design2Element.length; i++){  
    totalCa += parseFloat(design2Element[i].dataset.design2CarbonAbsolute);
    totalTa += parseFloat(design2Element[i].dataset.design2ToxicityAbsolute);
  }

  //remove scientic notation
  totalCa = removeExponent(totalCa);
  totalTa = removeExponent(totalTa);
 
  //store normaliser 
  //store in data attrinute
  d2CaNormaliser.dataset.d2normaliser = totalCa;
  d2TaNormaliser.dataset.d2normaliser = totalTa;
  
  //store in global scope
  d2CaNormaliserValue = totalCa;
  d2TaNormaliserValue = totalTa;

  //show  the divisor
  $('#d2CaNormaliser').text("Ca norm divisor:" + totalCa);
  $('#d2TaNormaliser').text("Ta norm divisor:" + totalTa);

  //SET value
  //now loop thru all design 2 elements and set the  normalised values for carbon and Toxicitiy
  for(i = 0; i< design2Element.length; i++){  
    design2Element[i].dataset.design2CarbonNormalised = (design2Element[i].dataset.design2CarbonAbsolute / totalCa);
    design2Element[i].dataset.design2ToxicityNormalised = (design2Element[i].dataset.design2ToxicityAbsolute / totalTa);
    //set debug values
    design2Element[i].closest('td').querySelector('.raw .ca').textContent = "Ca: " + design2Element[i].dataset.design2CarbonAbsolute;
    design2Element[i].closest('td').querySelector('.raw .ta').textContent = "Ta: " + design2Element[i].dataset.design2ToxicityAbsolute;
    design2Element[i].closest('td').querySelector('.raw .cn').textContent = 'Cn: '+ round(design2Element[i].dataset.design2CarbonNormalised, 2);
    design2Element[i].closest('td').querySelector('.raw .tn').textContent = "Tn: " + round(design2Element[i].dataset.design2ToxicityNormalised, 2);

  }

}
function calcDesign3Normalisers()
{
  //get all elements of carbon raw values 
  var design3Element =  document.querySelectorAll(".design3");
  
  var totalCa = 0;
  var totalTa = 0;

  // TOTALs
  //loop thru absolute  values and total them up
  for(i = 0; i< design3Element.length; i++){  
    totalCa += parseFloat(design3Element[i].dataset.design3CarbonAbsolute);
    totalTa += parseFloat(design3Element[i].dataset.design3ToxicityAbsolute);    
  }

  //remove scientic notation
  totalCa = removeExponent(totalCa);
  totalTa = removeExponent(totalTa);
 
  //store normaliser 
  //store in data attrinute
  d3CaNormaliser.dataset.d3normaliser = totalCa;
  d3TaNormaliser.dataset.d3normaliser = totalTa;
  
  //store in global scope
  d3CaNormaliserValue = totalCa;
  d3TaNormaliserValue = totalTa;

  //show  the divisor
  $('#d3CaNormaliser').text("Ca norm divisor:" + totalCa);
  $('#d3TaNormaliser').text("Ta norm divisor:" + totalTa);

  //SET value
  //now loop thru all design 3 elements and set the  normalised values for carbon and Toxicitiy
  for(i = 0; i< design3Element.length; i++){  
    design3Element[i].dataset.design3CarbonNormalised = (design3Element[i].dataset.design3CarbonAbsolute / totalCa);
    design3Element[i].dataset.design3ToxicityNormalised = (design3Element[i].dataset.design3ToxicityAbsolute / totalTa);
    //set debug values
    design3Element[i].closest('td').querySelector('.raw .ca').textContent = "Ca: " + design3Element[i].dataset.design3CarbonAbsolute;
    design3Element[i].closest('td').querySelector('.raw .ta').textContent = "Ta: " + design3Element[i].dataset.design3ToxicityAbsolute;
    design3Element[i].closest('td').querySelector('.raw .cn').textContent = 'Cn: '+ round(design3Element[i].dataset.design3CarbonNormalised, 3);
    design3Element[i].closest('td').querySelector('.raw .tn').textContent = "Tn: " + round(design3Element[i].dataset.design3ToxicityNormalised, 3);
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

//event input filter
function validate(e) {
  
  var charCode = e.keyCode? e.keyCode : e.charCode
  if (!(charCode >= 48 && charCode <= 57)) {
      if(!(charCode>=37 && charCode<=40))
          if(charCode!=8 && charCode!=46)
          return false;
  }
}

//other utility funcs
// function addRow() {
//   console.log("addrow")

//   tabletarget = document.querySelector('#dataTable');
//   target = document.querySelector('#dataTable tbody');
//   rowindex = tabletarget.rows;
//   console.log(tabletarget.rows);
//   source = document.querySelector('.template').cloneNode(true);

//   target.prepend(source);
  
//   source.classList.add('addedrow')
//   fadeIn(source,500);

// }

// document.querySelector('#AddComponent').addEventListener('click', addRow);


/*
* Build chart data
*/
function buildChartData()
{
  console.log(typeof partsTargetSelect);
  var sel = partsTargetSelect[0];
  
  uniqueComponentNames = [];
  for (var i=0, n=sel.options.length;i<n;i++) { // looping over the options
    uniqueComponentNames.push(sel.options[i].value);
  }

    var str = JSON.stringify(uniqueComponentNames, undefined, 9); // spacing level = 2
    output(syntaxHighlight(str));
    console.log();
 
}

function getGoogleChartRowData(){
  console.log("gchart");
    var dtable = document.querySelector('#dataTable tbody');
    console.log(dtable);
    var rows = dtable.rows;

    for(var i =0 ; i < rows.length;i++ ){
      console.log('row'+ [i]);
    }
}

// Native fadeIn
function fadeIn(elem, ms) {
  elem.style.opacity = 0;

  if (ms) {
    let opacity = 0;
    const timer = setInterval(function() {
      opacity += 50 / ms;
      if (opacity >= 1) {
        clearInterval(timer);
        opacity = 1;
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 1;
  }
}

// add new row from template
$(function() {
  $('#AddComponent').click(function(e) {
    console.log("click");
    e.preventDefault();
    var row = 1;
    // addRow('dataTable');
    // var node = document.getElementById('template');
    // table.row.add(rowtemp         
    // ).draw(false);

    var template = $('tr.template')
      .clone()                        // CLONE THE TEMPLATE
      .attr('id', 'row' + (row++))  
      .attr('class', 'addedrow')   // MAKE THE ID UNIQUE
      .prependTo($('#dataTable tbody'))
      // .appendTo($('#dataTable tbody'))  // APPEND TO THE TABLE
      .fadeIn(2000);                       // SHOW IT

      // setTimeout(function(){
      //   template.removeClass('addedrow');
      // },2000);
  });
});

// var addRowButton = document.querySelector("#AddComponent");
// addRowButton.addEventListener("click", function(){
//   addRow('dataTable');
// });


//datatable dynamic row add
// function addRow(tableID) {
//   // Get a reference to the table
//   let tableRef = document.getElementById(tableID);

//   // Insert a row at the end of the table
//   let newRow = tableRef.insertRow(-1);

//   // // Insert a cell in the row at index 0
//   // let newCell = newRow.insertCell(0);

//   // // Append a text node to the cell
//   // let newText = document.createTextNode('New bottom row');
//   // newCell.appendChild(newText);
// }

// select chnage listener
// $('select').on('change', function (e) {
//   var optionSelected = $("option:selected", this);
//   var valueSelected = this.value;
//   console.log(valueSelected);
//   console.log(data);
// });
// // Call addRow() with the table's ID

// function populatePartsList(valueSelected){
//   var select = $('#parts');

//         var listitems = '';
        
//         for(i = 0; i< partNames.length; i++){      
//           console.log(partNames.componentName);
//             listitems += '<option value=' + partNames.componentName + '>' + partNames.componentName + '</option>';
//         };
        
       
// }


$('#dataTable').on('mouseover mouseout', '.dosomething', function(){
  // what you want to happen when mouseover and mouseout 
  // occurs on elements that match '.dosomething'
});

//d1CaNormaliser.dataset.d1normaliser = "10000"
// console.log(d1CaNormaliser.dataset.d1normaliser);
//   // alert("normski: "+d1NormaliserValue);

//   s  = "6.3858779999999995e-12";
  

//   e = removeExponent(s);
  
//   console.log("toNonExponential " + e);
//   // d = parseInt(s);//, NumberStyles.Float);
//   console.log(partSelected);

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