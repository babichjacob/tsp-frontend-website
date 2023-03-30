/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openNav() {
    document.getElementById("mySidebar").style.width = "260px";
    document.getElementById("main").style.marginLeft = "260px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  (function(){
  
    function emit(target, name) {
      var event
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(name, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = name;
      }
  
      event.eventName = name;
  
      if (document.createEvent) {
        target.dispatchEvent(event);
      } else {
        target.fireEvent("on" + event.eventType, event);
      }    
    }
  
    var outputsSelector = "input[type=number][source],select[source]";
    
    function onChange(e) {
      var outputs = document.querySelectorAll(outputsSelector)
      for (var index = 0; index < outputs.length; index++) {
        var item = outputs[index]
        var source = document.querySelector(item.getAttribute('source'));
        if (source) {
          if (item === e.target) {
            source.value = item.value
            emit(source, 'input')
            emit(source, 'change')
          }
  
          if (source === e.target) {
            item.value = source.value
          }
        }
      }
    }
    
    document.addEventListener('change', onChange)
    document.addEventListener('input', onChange)
  }())

/* Old html built-in slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}
*/

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}


function closeTimer() {
  document.getElementById("myDropdown").classList.remove("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
    }
    /*if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show')
    }*/
  }
}

function openSchedule() {
  document.getElementById("scheduleDropdown").classList.toggle("show");
}

function closeSchedule() {
  document.getElementById("scheduleDropdown").classList.remove("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropsch')) {
    var dropdowns = document.getElementsByClassName("dropdown-schedule");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
    }
    /*if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show')
    }*/
  }
}


//Modal Login Button
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function changeImage() {
  if (document.getElementById("imgClickAndChange").src == "images/PowerButton.png"){
      document.getElementById("imgClickAndChange").src = "images/PowerButtonOn.png";
  } else {
      document.getElementById("imgClickAndChange").src = "images/PowerButton.png";
  }
}