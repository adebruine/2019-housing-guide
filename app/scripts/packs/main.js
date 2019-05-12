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
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
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

var selections = {};
var numCriteria = $('.filter').length;
console.log(numCriteria);
var criteria = [
  'north',
  'south',
  'college',
  'community',
  'hall',
  'small',
  'medium',
  'large',
  'AC',
  'dining',
  'female',
  'freshmen',
  'opengender',
];

// mega json of filters and matches
var allFilters = {};

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

// type of dorm

allFilters.hall = dormList
  .filter(function(dorm) {
    return dorm.dorm_type == 'Hall';
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

  allFilters.college = dormList
    .filter(function(dorm) {
      return dorm.dorm_type == 'College';
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

var selections = {};

var count = function(obj) {
  var num = 0;
  for (var i in obj) {
    if (obj[i] == true) {
      num += 1;
    }
  }
  return num;
};

$('.filter').change(function(i, elem) {
  $('.filter').map(function(i, elem) {
    selections[
      $(elem)
        .attr('id')
        .split('-')[0]
    ] = elem.checked;
  });

var numSelected = count(selections);

if (numSelected) {
  $('.dorm-row').each(function(i, elem) {
    var name = $(elem).data('fullname');

    var matchCount = 0;
    for (var i = 0; i < criteria.length; i++) {
      if (

        selections[criteria[i]] == true &&

        allFilters[criteria[i]].includes(name)

      ) {
        console.log(name, 'match');
        matchCount +=  1;
      }
    }

    if (matchCount == numSelected) {
      $(this).addClass('match');
   } else {
      $(this).removeClass('match');
   }
 });
} else {
  $(".dorm-row").removeClass('match');
}
});


$('.clear-filter').click(function() {
  clearFilter();
});

function clearFilter() {
  $('.filter').prop('checked', false);
  $('.dorm-row').removeClass('match');
}
