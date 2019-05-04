# LiveGreenOutdoorsChicago
Web based app to show users the location of **green roofs**, **farmer's markets**, and **bike racks** in Chicago


## Resources Used:

- [API from Chicago's public data portal:](https://data.cityofchicago.org/)

## USER STORIES

-Users then can select from buttons to find the closest **Green Roof**, **Bike Rack**, **Farmers Market**.
    - User can see locations pinned on a map, that can drag and zoom.
    - User can click **marker** to get more info including *address* and **Farmer's Market day/time**.  
      - **Greenroof** markers have links that open **fact sheets** in another window.


![Wireframe](Wireframe.png)

-------------------------
Querying API location data and visualizing it with Google.maps.
  - Classes used to standardize queries for each API.
    - Classes have:
      dataSetID => the part of the url unique to each API.
      ```
      class API {
        constructor (dataSetID, name) {
          this.name = name;
          this.baseURL = `https://data.cityofchicago.org/resource/`;
          this.uniqueID = `${dataSetID}`;
      ```
      - Allows me to query 3 different API's by only changing the **datasetID**
      ```
      class API {
        constructor (dataSetID, name) {
          this.name = name;
          this.baseURL = `https://data.cityofchicago.org/resource/`;
          this.uniqueID = `${dataSetID}`;
      ```

  - Load google map
    ```
    let map;
    function initMap () {
      map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 41.871930, lng: -87.653404},
        zoom: 10
      });
    }
    ```
    - Vanilla javascript used with google.maps script.

    - Query items in city API to get latitude/longitude.
      - Add data points to map.
    ```
    for (let i = 0; i < reportData.length; i++) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(reportData[i].latitude, reportData[i].longitude),
        map: map
      })
    ```
    - Data points can be clicked to adjust zoom and map center.
    ```
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
    ```
    - Markers can display object info
      - Using Google's infoWindow() and open() functions.
      ```
      infoWindow.open(map,marker);
      ```


Button functions:
  - When clicked, get locations of button item named.
  - A function takes a parameter of a class instance that is the specific API.

Farmer's markets:
  - Unique websites sometimes available.

-------------------------
Stretch Goals:

Allow for users to find nearest mural.

Allow users to get directions.
  - Will require Google's directions API.

Allow users to add photos.

Add custom icons.

Add **openspace** data.

Add a background that scrolls city murals.

------------------------

// NEXT:
  // - buttons change color when clicked and stay that color until another button is selected.
  // - ADD OSCILATING PHOTO BACKGROUNDS
// -GET USER LOCATION
// -SECOND CLICK REMOVES TRANSIT OR BIKE PATHS

// -GET HOSTING SET UP
// -OPTIMIZE README WITH PHOTOS AND CODE

## Author

**Joshua M. McGehee**
