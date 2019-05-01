console.log("LiveGreenOutdoorsChicago");

/////////////// -------------- Loading map.
// let map;
// const initMap = () => {
//   map = new google.maps.Map($('#map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }


////////////////// ------------- Querying locations

//   --ADD STYLING.

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
    return this.getAPIUrl() + '?' + this.limit(10);
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


$(() => {
  /////------------map
  // initMap()


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
