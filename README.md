# LiveGreenOutdoorsChicago
Web based app to show users the location of open spaces, green roofs, farmer's markets, and bike racks in Chicago

Uses API from Chicago's public data.

Allows users to enter their location.

Users then can select from buttons to find the closest Open Space, Green Roof, Bike Rack, Farmers Market.

User can see locations pinned on a map, that can drag and zoom.

- Use API to show locations on map window.
- CSS to have street level images of Chicago in background.

-------------------------
Querying API location data and visualizing it with Google.maps.
  - Classes used to standardize queries for each API.
    - Classes have:
      dataSetID => the part of the url unique to each API.
      <!-- queryType => what we're querying.  --> not necessary

  - Query items in city API to get latitude/longitude.
  - Load google map
    - Vanilla javascript used with google.maps script.
    - Add data points to map.

Button functions:
  - When clicked, get locations of button item named.
  - A function takes a parameter of a class instance that is the specific API. 

Farmer's markets:
  - Unique websites sometimes available.

-------------------------
Stretch Goals:

Optimize for mobile.

Add a background that scrolls city murals. Allow for users to find nearest mural.

Allow users to get directions.
