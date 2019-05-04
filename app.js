console.log("LiveGreenOutdoorsChicago");


////////////////// ------------- Querying locations

let lastInfoWindow;

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

class FarmersMarketInfo extends API {
  setMarkers () {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 41.871930, lng: -87.653404},
      zoom: 10
    });
    $.ajax({
      url: this.getQueryUrl()
    }).then((reportData) => {
      for (let i = 0; i < reportData.length; i++) {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(reportData[i].latitude, reportData[i].longitude),
          map: map
        })
        marker.addListener('click', function() {
          lastInfoWindow && lastInfoWindow.close();
          map.setCenter(marker.getPosition());
          const getInfo = () => {
            let infoWindow = new google.maps.InfoWindow({
              content: `<p>${reportData[i].location}</br>
                 ${reportData[i].intersection}</br>
                 ${reportData[i].day}
                 ${reportData[i].start_time} to ${reportData[i].end_time}</br>
                 ${reportData[i].website}</p>`
            })
            infoWindow.open(map,marker);
            setTimeout(() => {
              lastInfoWindow = infoWindow;
            }, 100);
          };
          getInfo();
        });
      }
    })
  }
}

class BikeRackInfo extends API {
  setMarkers () {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 41.871930, lng: -87.653404},
      zoom: 10
    });
    $.ajax({
      url: this.getQueryUrl() //can I use 'this' or do i need to co back to having a parameter? see line 138//yes...
    }).then((reportData) => {//I know I could DRY this by using a callback...but that's terrifying atm...
      for (let i = 0; i < reportData.length; i++) {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(reportData[i].latitude, reportData[i].longitude),
          map: map
        })
        marker.addListener('click', function() {
          lastInfoWindow && lastInfoWindow.close();
          map.setCenter(marker.getPosition());
          const getInfo = () => {
            let infoWindow = new google.maps.InfoWindow({
              content: `<p>${reportData[i].community_name}</br>
              ${reportData[i].address}</p>`
            })
            infoWindow.open(map,marker);
            setTimeout(() => {
              lastInfoWindow = infoWindow;
            }, 100);
          };
          getInfo();
        });
      }
    })
  }
}

class GreenRoofInfo extends API {
  setMarkers () {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 41.871930, lng: -87.653404},
      zoom: 10
    });
    $.ajax({
      url: this.getQueryUrl() //can I use 'this' or do i need to co back to having a parameter? see line 138
    }).then((reportData) => {
      for (let i = 0; i < reportData.length; i++) {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(reportData[i].latitude, reportData[i].longitude),
          map: map
        })
        marker.addListener('click', function() {
          lastInfoWindow && lastInfoWindow.close();
          map.setCenter(marker.getPosition());
          const getInfo = () => {
            let infoWindow = new google.maps.InfoWindow({
              content: `<p>${reportData[i].house_number}
              ${reportData[i].pre_dir}
              ${reportData[i].street_name}</br>
              </p><a href="${reportData[i].fact_sheet}" target="_blank">Fact Sheet</a>`
            })
            infoWindow.open(map,marker);
            setTimeout(() => {
              lastInfoWindow = infoWindow;
            }, 100);
          };
          getInfo();
        });
      }
    })
  }
}

const bikeRacks = new BikeRackInfo('cbyb-69xx', 'Bike Racks');
const farmersMarkets = new FarmersMarketInfo('3r5z-s68i', 'Farmer\'s Markets');
const greenRoofs = new GreenRoofInfo('tnn6-5k2t', 'Greenroofs')


/////////////// -------------- Loading map.

/// Can we get the map's current center?
///// ADD INFO POP-UPS
///// GET USER LOCATION


let map;
function initMap () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 41.871930, lng: -87.653404},
    zoom: 10
  });
}

const resetMap = () => {
  $('#info').empty();
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
    bikeRacks.setMarkers();
  })
  $('#green-roofs').on('click', () => {
    greenRoofs.setMarkers();
  })
  $('#farmers-markets').on('click', () => {
    farmersMarkets.setMarkers();
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
