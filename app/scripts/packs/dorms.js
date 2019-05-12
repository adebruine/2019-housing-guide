import '../kickstart';

console.log('hello');

var btn = document.getElementsByClassName('dropbtn')[0];

btn.onclick = function() {
  console.log('clicked');
  if (document.getElementById('myDropdown').classList.contains('show')) {
    btn.innerHTML = "Select a dorm  <i class='fa fa-caret-down'></i>";
  } else {
    btn.innerHTML = "Select a dorm  <i class='fa fa-caret-up'></i>";
  }
  document.getElementById('myDropdown').classList.toggle('show');
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById('myDropdown');
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};

var map = L.map('dorm-map').setView([42.0509487, -87.6779897], 15);

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }
).addTo(map);

L.marker([42.0509487, -87.6779897]).addTo(map);
