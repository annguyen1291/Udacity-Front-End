//VIEW MODEL
var ViewModel = function () {
  // Create an observableArray to store all hotels
  hotels = ko.observableArray([]);
  setHotel = function(clickedHotel) {
    // Clicking a location on the list makes its associated map marker bounce
    clickedHotel.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
      clickedHotel.marker.setAnimation(null); 
    }, 750);

    infowindow.setContent(clickedHotel.placeInfo);
    infowindow.open(map, clickedHotel.marker);

    map.setCenter(clickedHotel.geometry.location);
    drawer.classList.remove('open');
  };

  // Search for hotels near Hanoi, return each place for process  
  service = new google.maps.places.PlacesService(map);   
  service.nearbySearch({
    location: hanoi,
    radius: 1500,
    type: ['hotel']
  }, processResults);

  function processResults(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      foursquareURL = 'https://api.foursquare.com/v2/venues/search?client_id=PVBOMUZ1XODOF5CCOCJL442QQPTCKULPJKNET0J0OD0IDLP4&client_secret=L433ZMHCXBLFR5PQX35ECQPTHUIMXDK1UDVEKYVGOJOFROYF&v=20130815&ll=';
      for (var i = 1; i < results.length - 1; i++) {

        // Request additional information from FourSquare
        (function (i) {
          var placeLoc = results[i].geometry.location;
          var foursquareAJAX = $.ajax(foursquareURL + placeLoc.lat().toFixed(2) + ',' + placeLoc.lng().toFixed(2) + '&query=\'' + results[i].name +'\'&limit=1', {dataType: "jsonp"});
          foursquareAJAX.done(function(data) {

            // Push the information from FourSqure to each hotel
            results[i].foursquareInfo = data.response.venues[0];

            var phone;
            if (results[i].foursquareInfo.contact.formattedPhone) {
              phone = results[i].foursquareInfo.contact.formattedPhone;
            } else {
              phone = "<em>unavailable</em>";
            }

            results[i].placeInfo = "<b>" + results[i].name + "</b><br><br>Address: " + results[i].vicinity + "<br>Phone: " + phone + "<br>Check-in: " + results[i].foursquareInfo.stats.checkinsCount;

            // Create map markers with detailed information
            var marker = new google.maps.Marker({
              map: map,
              position: placeLoc
            });
            google.maps.event.addListener(marker, 'click', function() {

              // Markers bounce when clicked 
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){
                marker.setAnimation(null); 
              }, 750);

              infowindow.setContent(results[i].placeInfo);
              infowindow.open(map, this);

              map.setCenter(placeLoc);
              drawer.classList.remove('open');
            });
            results[i].marker = marker;

            // Add a property determining visibility
            results[i].shouldShow = ko.observable(true);   

            // Push the result to hotels observableArray
            hotels.push(results[i]);     
          });

          // Handle an event when FourSquare fails to load.
          foursquareAJAX.fail (function() {
            alert("Foursquare Data Retrieval Failed");
          }); 
        })(i);                
      }
    }
  }

  // Search box function to filter hotels
  query = ko.observable('');
  search = function(value) {     
    for(var i = 0; i < hotels().length; i++) {
      hotels()[i].shouldShow(false);
      hotels()[i].marker.setVisible(false);        
      if(hotels()[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        hotels()[i].shouldShow(true);
        hotels()[i].marker.setVisible(true);
      }
    }
  }
  query.subscribe(search);
}

//Function to load map start up app     
function initMap() {
  hanoi = {lat: 21.028472, lng: 105.854167};
  drawer = document.getElementById('drawer');
  infowindow = new google.maps.InfoWindow();  
  map = new google.maps.Map(document.getElementById('map'), {
    center: hanoi,
    zoom: 15,
    disableDefaultUI: true
  });

  // Create a button to show/hide hamburger menu
  var controlDiv = document.createElement('div');
  controlDiv.id = "controlDiv";  
  controlDiv.innerHTML = "<img class='menu' src='img/menu.png'>";  
  controlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
  controlDiv.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();;
  });

  // Close navigation when clicking map
  map.addListener('click', function() {
    window.setTimeout(function() {
      drawer.classList.remove('open');
    });
  });
  
  // Instantiate ViewModel:
  ko.applyBindings(new ViewModel());  
}

// Handle an event when Google Maps fails to load.
function failedToLoad() {
  alert("Google Maps Data Retrieval Failed");
}
