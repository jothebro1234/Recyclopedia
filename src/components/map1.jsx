import React, { useEffect } from 'react';

const Map1 = () => {
  useEffect(() => {
    let map, infoWindow;

    const initMap = async () => {
      const { Map, InfoWindow } = await google.maps.importLibrary("maps");
      let center = new google.maps.LatLng(52.369358, 4.889258);

      map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 12,
        mapId: "DEMO_MAP_ID",
      });

      infoWindow = new google.maps.InfoWindow();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            console.log(pos.lat, pos.lng);
            findPlaces(pos.lat, pos.lng);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.log("WTF");
        handleLocationError(false, infoWindow, map.getCenter());
      }
    };

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    const findPlaces = async (latitude, longitude) => {
      const { Place } = await google.maps.importLibrary("places");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      const request = {
        textQuery: "Recycling near me",
        fields: ["displayName", "location", "businessStatus"],
        locationBias: { lat: latitude, lng: longitude },
        isOpenNow: true,
        language: "en-US",
        maxResultCount: 8,
        minRating: 3.2,
        region: "us",
      };
      //@ts-ignore
      const { places } = await Place.searchByText(request);

      if (places.length) {
        console.log(places);

        const { LatLngBounds } = await google.maps.importLibrary("core");
        const bounds = new LatLngBounds();

        // Loop through and get all the results.
        places.forEach((place) => {
          const markerView = new AdvancedMarkerElement({
            map,
            position: place.location,
            title: place.displayName,
            gmpClickable: true,
          });
          markerView.addListener("gmp-click", ({ domEvent, latLng }) => {
            // const { target } = domEvent;
            console.log(place.id);
            const infoString = `
              <h3 style="color:black;">${markerView.title}</h3>
              <p><a href="https://www.google.com/maps/search/?api=1&query=null&query_place_id=${place.id}">Search on Google Maps</a></p>
            `;
            const infoWindow = new google.maps.InfoWindow({
              content: infoString,
            });
            console.log("https://www.google.com/maps/search/?api=1&query=null&query_place_id=${place.id}")
            infoWindow.open({
              anchor: markerView,
              map,
            });
          });

          bounds.extend(place.location);
          console.log(place);
        });
        map.fitBounds(bounds);
      } else {
        console.log("No results");
      }
    };

    initMap();
  }, []); // Corrected useEffect closing brackets

  return <div id="map" style={{ height: "80vh", width: "80vw" }}></div>;
};

export default Map1;
