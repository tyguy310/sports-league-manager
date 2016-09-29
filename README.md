This is the README for our project.

To launch our site, go to [https://immense-mountain-80924.herokuapp.com/events]


sample Weather Underground query with registered key:
ZIPCODE should be injected for the zip code of the location.
```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
<script>
jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/903be07b671ce816/geolookup/conditions/q/ZIPCODE.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
});
</script>
```
const WUNDERKEY = '903be07b671ce816';

And another example, saving a few variables including an image of the current weather:
```
const WEATHER_URL = 'https://api.wunderground.com/api/903be07b671ce816/conditions/q/' + ZIPCODE + '.json';
const WUNDERKEY = '903be07b671ce816';
$.ajax({
  method: 'GET',
  jsonp: 'callback',
  dataType: 'jsonp',
  url: WEATHER_URL
}).done(function(results) {
  locationTemp = results.current_observation.feelslike_f;
  locationWeather = results.current_observation.weather;
  locationWeatherImg = results.current_observation.icon_url;
```
