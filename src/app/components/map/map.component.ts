import { Component,Input, OnInit} from '@angular/core';
import { Markers } from 'src/app/interfaces/interfaces';
import { CoorInfo } from '../../interfaces/interfaces';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    position = {
    lat: 8.74798,
    lng: -75.88143
  }

  label = {
    titulo: 'ubicación',
    subtitulo: 'ubicación del daño'
  }

  map: any;
  marker: any;
   //Markers = {
  //   position: {
  //     lat: this.position.lat,
  //     lng: this.position.lng
  //   },
  //   title: this.label.titulo
  // };
  coorInfor: CoorInfo = null;
  infowindow: any;
  positionSet: any;

  constructor() { }

  ngOnInit() {
    this.loadmap();
  }

  loadmap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: this.position.lat, lng: this.position.lng };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false
    });
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker();
      mapEle.classList.add('show-map');
    });
  }
  
  addMarker(){
    const markers = new google.maps.Marker({
      position: this.position,
      map: this.map,
      title: this.label.titulo,
      draggable: true,
      animation: google.maps.Animation.DROP
    })
    return markers;
  }


}
