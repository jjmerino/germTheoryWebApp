angular.module('app.directives.map', [])
  .directive('spotsMap', function(Config, $http) {
    var markers = [];
    var clusterStyles = [
      {
        textColor: 'white',
        url: 'img/marker.png',
        height: 35,
        width: 34
      },
      {
        textColor: 'white',
        url: 'img/clusters2.png',
        height: 38,
        width: 38
      },
      {
        textColor: 'white',
        url: 'img/clustersbig.png',
        height: 56,
        width: 56
      }
    ];
    /**
     * Add a new report to the map
     */
    var addReportToMap = function(report,map){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(report.latitude, report.longitude),
        map: map,
        title:report.description,
        icon : 'img/marker.png'
      });
      markers.push(marker);
    };

    // Return various things
    return {
      restrict: 'E',
      scope: {
      },
      link: function ($scope, $element, $attr) {
        function initialize() {
          // var mapOptions = {
          //   center: new google.maps.LatLng(37.7836830,-122.4092210),
          //   zoom: 16,
          //   mapTypeId: google.maps.MapTypeId.ROADMAP
          // };
          var map = L.map($element[0], {
            dragging: true,
            center: [30.505, -100.09],
            zoom: 3,
            touchZoom: true,
            tap: false
          });
          map.locate({ setView: true, maxZoom: 14 });
          function onLocationFound(e) {
              console.log("found location");
              
              var radius = e.accuracy / 2;

              L.marker(e.latlng).addTo(map);

              L.circle(e.latlng, radius).addTo(map);
          }
          L.tileLayer('http://{s}.tiles.mapbox.com/v3/kmeurer.k9ccphdb/{z}/{x}/{y}.png', {
              maxZoom: 18
          }).addTo(map);

          function onLocationError(e) {
              alert("GermTheory was unable to access your location.  Have you turned on location data in the settings?");
          }
          map.on('locationfound', onLocationFound);
          map.on('locationerror', onLocationError);
          // var map = new google.maps.Map($element[0], mapOptions);


          // $http.get(Config.url+'/api/cases').then(function(resp){
          //   data = resp.data;
          //   for(var i = 0; i < data.length; i++){
          //     var report = data[i];
          //     addReportToMap(report,map);
          //   }
          //   var mcOptions = {gridSize: 50, maxZoom: 15, styles: clusterStyles};
          //   var mc = new MarkerClusterer(map, markers, mcOptions);
          // });

          // Stop the side bar from dragging when mousedown/tapdown on the map
          // google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          //   e.preventDefault();
          //   return false;
          // });
        }

        if (document.readyState === "complete") {
          initialize();
        } else {
          // google.maps.event.addDomListener(window, 'load', initialize);
        }
      }
    }
  });

