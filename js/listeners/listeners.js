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
function design1TextInputChange(e) {
  console.log("design1TextInputChange");
}
function design1SelectInputChange(e) {
  console.log("design1SelectInputChange");
}
function design2TextInputChange(e) {
  console.log("design2TextInputChange");
}
function design2SelectInputChange(e) {
  console.log("design2SelectInputChange");
}
function design3TextInputChange(e) {
  console.log("design3TextInputChange");
}
function design3SelectInputChange(e) {
  console.log("design3SelectInputChange");
}

$('#dataTable').on('mouseover mouseout', '.dosomething', function(){
  // what you want to happen when mouseover and mouseout 
  // occurs on elements that match '.dosomething'
});
d1Normaliser.dataset.d1normaliser = "10000"
console.log(d1Normaliser.dataset.d1normaliser);
  // alert("normski: "+d1NormaliserValue);

