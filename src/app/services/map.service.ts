import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
declare let google: any;


@Injectable({
  providedIn: 'root'
})
export class MapService {

  NewPosition: string;

  label = {
    titulo: 'ubicación',
    subtitulo: 'ubicación del daño'
  }

  location: any;
  map: any;
  marker: any;
  infowindow: any;


  constructor() {
  }


  loadmap(fathertab: string, position: any, type: number) {

    if (fathertab === 'reportar') {
      const mapEle: HTMLElement = document.getElementById(`${fathertab}-map`);
      const geocoder = new google.maps.Geocoder();
      const myLatLng = { lat: position.lat, lng: position.lng };

      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 15,
        disableDefaultUI: true,
        clickableIcons: false,
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.marker = this.addMarker(position);
        mapEle.classList.add('show-map');
      });

      this.map.addListener("drag", () => {
        const newPosition = this.map.getCenter();
        this.marker.setPosition(newPosition);
        this.NewPosition = JSON.stringify(newPosition);
      });

      this.map.addListener("dragend", () => {
        this.geocode(geocoder);
        this.sendLocation();
      });

    } else if (fathertab === 'buscar') {

      const mapEle: HTMLElement = document.getElementById(`${fathertab}-map`);
      const myLatLng = { lat: position.lat, lng: position.lng };

      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 18,
        disableDefaultUI: true,
        clickableIcons: false,
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.addInfoAndMarker(position, type);
        mapEle.classList.add('show-map');
      });

    }
  }

  geocode(geocoder: any) {
    const StrLatLng = (this.NewPosition).split(",", 2);
    const latlng = {
      lat: parseFloat(StrLatLng[0].substring(7)),
      lng: parseFloat(StrLatLng[1].substring(6)),
    };
    geocoder.geocode({ location: latlng }).then((response) => {
      if (response.results[0]) {
        const info = {
          direccion: response.results[0],
          posicion: latlng
        };

        this.location = info;
      } else {
        console.log("No results found");
      }
    })
      .catch((e) => console.log("Geocoder failed due to: " + e));


  }

  sendLocation() {
    if (this.location == undefined) {

    } else {
      return this.location;
    }
  }

  addMarker(position: any) {
    const icon = "../../assets/logos/alfiler.png";
    const markers = new google.maps.Marker({
      position: position,
      map: this.map,
      title: this.label.titulo,
      icon: icon,
      draggable: false,
      animation: google.maps.Animation.DROP
    })
    return markers;
  }

  addInfoAndMarker(position: any, type: number) {
    const markers = new google.maps.Marker({
      position: position,
      map: this.map,
      title: this.label.titulo,
      draggable: false,
      icon: "../../assets/logos/ubicación 3.png",
      animation: google.maps.Animation.DROP
    })

    
    if (type == 1) {

      const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Tipo de reporte:</h1>' +
      '<div id="bodyContent">' +
      "<p><b>Daño en alumbrado público</b>" +
      "</div>" +
        "</div>";
      
      this.infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    } else if (type == 2) {
      const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Tipo de reporte:</h1>' +
      '<div id="bodyContent">' +
      "<p><b>Acumulación de basura</b>" +
      "</div>" +
        "</div>";
      
      this.infowindow = new google.maps.InfoWindow({
        content: contentString,
        Width: 200,
      });
    } else if (type == 3) {
      const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Tipo de reporte:</h1>' +
      '<div id="bodyContent">' +
      "<p><b>Fallo de semáforo</b>" +
      "</div>" +
        "</div>";
      
      this.infowindow = new google.maps.InfoWindow({
        content: contentString,
        Width: 200,
      });
    }
    
    // markers.addListener("click", () => {
    //   this.infowindow.open({
    //     anchor: markers,
    //     map: this.map,
    //   });
    // });

    return markers;
  }

  async getGeolocation() {
    const geocoder = new google.maps.Geocoder();
    const getPosition = await Geolocation.getCurrentPosition();
    const mapEle: string = `reportar`;

    if (getPosition !== undefined) {
      const myPosition = {
        lat: getPosition.coords.latitude,
        lng: getPosition.coords.longitude
      }
      this.NewPosition = JSON.stringify(myPosition);
      this.geocode(geocoder);

      window.setTimeout(() => {
        this.loadmap(mapEle, myPosition, 0);
      }, 1000);
    }


  }


}
