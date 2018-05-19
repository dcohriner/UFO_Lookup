
//
var $tbody = document.querySelector("tbody");

// declaring filtered fields
var $stateInput = document.querySelector("#state").value;
var $dateInput = document.querySelector("#date").value;
var $cityInput = document.querySelector("#city").value;
var $shapeInput = document.querySelector("#shape").value;
var $searchBtnInput = document.querySelector("#search").value;

// add event listener
$searchBtnInput.addEventListener("click", handleSearchButtonClick);

// variable to hold filtered data
var filtereddata = dataSet;

// render table
function renderTable() {
    $tbody.innerHTML="";
    for (var i=0; i<filtereddata.length; i++) {
        var entry = filtereddata[i];
        var fields = Object.keys(entry);
        var $row = $tbody.insertRow(i);
        for (var j = 0; j <fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);
        }
    }
}

// function handlesearchbuttonclick
function handleSearchButtonClick() {
    var filteredState = $stateInput.value.trim().toLowerCase();
    var filteredCity = $cityInput.value.trim().toLowerCase();
    var filteredShape = $shapeInput.value.trim().toLowerCase();
    var filteredDate = $dateInput.value.trim().toLowerCase();

    filtereddata = dataSet.filter(function(entry) {
        var ufoDate = entry.dateInput.toLowerCase();
        var ufoState = ufo.stateInput.toLowerCase();

        if (ufoDate === filteredDate) {
            if (ufoState === filteredState) {
                return ufoDate === filteredDate && filteredState
            }
        }

// Set filteredAddresses to an array of all addresses whose "state" matches the filter
filteredAddresses = dataSet.filter(function(address) {
    // var addressState = address.state.toLowerCase();
    var addressState = address.state.substring(0, filterState.length).toLowerCase();
    var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
    var addressShape = address.shape.substring(0,filterShape.length).toLowerCase();
    var ufoDate = address.datetime;
  
    if (filterShape == 'all' || filterShape == ''){
      var noShape = true;
    }

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    if (noShape){
      if (addressState === filterState && addressCity === filterCity &&  ufoDate == filterDate){
      return true;
    } 
    } else {
      if (addressState === filterState && addressCity === filterCity && addressShape === filterShape &&  ufoDate === filterDate){
        return true;
      } else {
        return false;
      }
    }
});
  renderTable();
  sortTable(2);
}
})
renderTable();
}


renderTable();

function handlecitySearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterCity = $cityInput.value.trim().toLowerCase();
  
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredAddresses = dataSet.filter(function(address) {
      var addressCity = address.city.toLowerCase();
  
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return addressCity === filterCity;
    });
    renderTable();
  }
  
  
  function handleShapeSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filteredShape = $shapeInput.value.trim().toLowerCase();
  
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredAddresses = dataSet.filter(function(address) {
      var addressShape = address.shape.toLowerCase();
  
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return addressShape === filterShape;
    });
    renderTable();
  }
  
  function handleDateSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filteredDate = $dateInput.value.trim();
  
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredAddresses = dataSet.filter(function(address) {
      var ufoDate = address.datetime;
  
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return ufoDate === filterDate;
    });
    renderTable();
  }
  
  // Add an event listener to the button, call handleButtonClick when clicked
  $loadMoreBtn.addEventListener("click", handleButtonClick);
  
  function handleButtonClick() {
    // Increase startingIndex by 100 and render the next section of the table
    startingIndex += resultsPerPage;
    renderTable();
    sortTable(2);
    // Check to see if there are any more results to render
    if (startingIndex + resultsPerPage >= filteredAddresses.length) {
      $loadMoreBtn.classList.add("disabled");
      $loadMoreBtn.innerText = "All Addresses Loaded";
      $loadMoreBtn.removeEventListener("click", handleButtonClick);
    }
  }
  
  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get 2 elements you want to compare,
       1 from current row and 1 from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  renderTable();
  sortTable(2);