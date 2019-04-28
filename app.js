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

//Can I query by location to get lat/long?

//set base query
const baseUrl = `https://data.cityofchicago.org/resource/cbyb-69xx.json`
let queryType = `rackid`

//set limit on how many
const limit = `$limit=`
let num = `10`

let queryUrl = baseUrl + '?' + '$where=' + queryType + '>2' + '&' + limit + num


const getLocations = () => {
  $.ajax({
    url: queryUrl
  }).then((reportData) => {
    // console.log(reportData);//works
    for (let i = 0; i < reportData.length; i++) {
      // console.log(reportData[i].location)//works location is {}
      $('#map').append($(`<h1>Rack ${i}: ${reportData[i].location.latitude},${reportData[i].location.longitude}</h1>`))
    }
  })
}

$(() => {
  /////------------map
  // initMap()

  /////------location data
  getLocations();
})
