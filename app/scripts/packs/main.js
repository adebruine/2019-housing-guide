import '../kickstart';

var dormData = require('./../../../data/dorms.json');
var dormList = dormData.dorms;

var purpleIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var grayIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var mymap = L.map('mapid').setView([42.055984, -87.675171], 15);

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWRlYnJ1aW5lIiwiYSI6ImNqYWNyczh1YjBjdjAyd28ybnVrN2FieDcifQ.4MiOQFZ5P1NJ9yyPiiGSWA',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken:
      'pk.eyJ1IjoiYWRlYnJ1aW5lIiwiYSI6ImNqYWNyczh1YjBjdjAyd28ybnVrN2FieDcifQ.4MiOQFZ5P1NJ9yyPiiGSWA',
  }
).addTo(mymap);

var markers = {};

(function makeMarkers() {
  for (var i in dormList) {
    var marker = L.marker([dormList[i].lat, dormList[i].long]).setIcon(
      grayIcon
    );
    marker.addTo(mymap);
    marker.bindPopup(dormList[i].short_name);
    marker.on('mouseover', function(e) {
      this.openPopup();
      this.setIcon(purpleIcon);
    });
    marker.on('mouseout', function(e) {
      this.closePopup();
      this.setIcon(grayIcon);
    });

    markers[i] = marker;
  }
})();

$('.dorm-row').mouseover(function() {
  let index = $(this).attr('data-marker');
  markers[index].setIcon(purpleIcon);
  markers[index].openPopup();
});

$('.dorm-row').mouseout(function() {
  let index = $(this).attr('data-marker');
  markers[index].setIcon(grayIcon);
  markers[index].closePopup();
});

// filtering!!

// just all of the dorm names, to match against
var allDorms = dormList.map(function(dorm) {
  return dorm.name;
});
console.log(allDorms);

// mega json of filters and matches
var allFilters = {};

// type of dorm
allFilters.college = dormList
  .filter(function(dorm) {
    return dorm.dorm_type == 'College';
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.community = dormList
  .filter(function(dorm) {
    return dorm.dorm_type == 'Community';
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.hall = dormList
  .filter(function(dorm) {
    return dorm.dorm_type == 'Hall';
  })
  .map(function(dorm) {
    return dorm.name;
  });

// side of campus
allFilters.north = dormList
  .filter(function(dorm) {
    return dorm.campus_side == 'North';
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.south = dormList
  .filter(function(dorm) {
    return dorm.campus_side == 'South';
  })
  .map(function(dorm) {
    return dorm.name;
  });

// miscellaneous perks
allFilters.ac = dormList
  .filter(function(dorm) {
    return dorm.has_ac == true;
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.AC = dormList
  .filter(function(dorm) {
    return dorm.has_ac == true;
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.dining = dormList
  .filter(function(dorm) {
    return dorm.dining == true;
  })
  .map(function(dorm) {
    return dorm.name;
  });
// dorm size
allFilters.small = dormList
  .filter(function(dorm) {
    return dorm.size <= 100;
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.medium = dormList
  .filter(function(dorm) {
    return dorm.size > 100 && dorm.size <= 200;
  })
  .map(function(dorm) {
    return dorm.name;
  });

allFilters.large = dormList
  .filter(function(dorm) {
    return dorm.size > 200;
  })
  .map(function(dorm) {
    return dorm.name;
  });

console.log(allFilters.small);

console.log(allFilters);

var selections = {};

$('.filter').change(function() {
  // which filter was checked?
  var criteria = $(this).attr('id');
  // array of all checked boxes
  $('.filter').map(function(i, elem) {
    selections[
      $(elem)
        .attr('id')
        .split('-')[0]
    ] = elem.checked;
  });

  $('.dorm-row').each(function(i, elem) {
    var name = $(elem).data('fullname');

    if (allFilters[criteria].includes(name)) {
      console.log(allFilters[criteria]);
      console.log(name + ' match');
      $(this).addClass('match');
    }
  });
});

$('.clear-filter').click(function() {
  clearFilter();
});

function clearFilter() {
  $('.filter').prop('checked', false);
  $('.dorm-row').removeClass('match');
}

console.log('make a map');
