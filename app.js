console.log("LiveGreenOutdoorsChicago");


////////////////// ------------- Querying locations

class API {
  constructor (dataSetID, name) {
    this.name = name;
    this.baseURL = `https://data.cityofchicago.org/resource/`;
    this.uniqueID = `${dataSetID}`;
    // this.queryType = queryType;
  }
  limit (num) {
    return `$limit=${num}`;
  }
  getAPIUrl () {
    return this.baseURL + this.uniqueID + `.json`
  }
  getQueryUrl () {
    return this.getAPIUrl() + '?'
    // + this.limit(10);
  }
  getLocations () {
    $.ajax({
      url: this.getQueryUrl()
    }).then((reportData) => {
      // console.log(reportData);//works
      $('#map').append(this.name)
      for (let i = 0; i < reportData.length; i++) {
        // console.log(reportData[i].location)//works location is {}
        $('#map').append($(`<h1>Location ${i}: ${reportData[i].latitude},${reportData[i].longitude}</h1>`))
      }
    })
  }
}

const bikeRacks = new API('cbyb-69xx', 'Bike Racks');
const farmersMarkets = new API('3r5z-s68i', 'Farmer\'s Markets');
const greenRoofs = new API('tnn6-5k2t', 'Greenroofs')


/////////////// -------------- Loading map.

///------------ADD EVENT LISTENERS TO MARKERS//done
///------------ZOOM MAP AND GET MARKERS BASED ON LOCATION//
/////------> Make the setMarkers function extend the API class so that different info can be appended to the page.

let map;
function initMap () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 41.8339037, lng: -87.8720466},
    zoom: 10
  });
}

const getInfo = (reportData) => {
  $('#info').empty();
  $('#info').append(
    `<p>${reportData.intersection}</br>
    ${reportData.start_time} to ${reportData.end_time}</p>`)
}

const setMarkers = (api) => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 41.8339037, lng: -87.8720466},
    zoom: 10
  });
  $.ajax({
    url: api.getQueryUrl()
  }).then((reportData) => {
    for (let i = 0; i < reportData.length; i++) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(reportData[i].latitude, reportData[i].longitude),
        map: map
      })
      marker.addListener('click', function() {
        map.setZoom(12);
        map.setCenter(marker.getPosition());
        getInfo(reportData[i]);
      });
    }
  })
}

const resetMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 41.8339037, lng: -87.8720466},
    zoom: 10
  });
}

const showTransit = () => {
  let transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
}

const showBikeLane = () => {
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
}


$(() => {
  // initMap();//looks like the callback needs to stay on the API script.
  // setMarkers(bikeRacks)//works to call a marker function based on button clicked
  $('#bike-racks').on('click', () => {
    setMarkers(bikeRacks);
  })
  $('#green-roofs').on('click', () => {
    setMarkers(greenRoofs);
  })
  $('#farmers-markets').on('click', () => {
    setMarkers(farmersMarkets);
  })
  $('#reset').on('click', () => {
    resetMap();
  })
  $('#bike-paths').on('click', () => {
    showBikeLane();
  })
  $('#transit').on('click', () => {
    showTransit();
  })
  /////------location data
  // getLocations();
  // console.log(bikeRacks);//k, works
  // console.log(bikeRacks.getAPIUrl());//works.
  // console.log(bikeRacks.getQueryUrl());//works
  // console.log(bikeRacks.getLocations());//works
  // console.log(farmersMarkets.getLocations());//comes up as undefined??
  // //     //both of these are coming up as undefined, but are appending the correct corrdinates.
  //   console.log(greenRoofs.getLocations());


})
