import { AfterViewInit, Component, Input } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  @Input() fathertab; 
  @Input() position; 

  constructor(private mapService: MapService) { }

  ngAfterViewInit() {
    this.mapService.loadmap(this.fathertab, this.position);
  }

}
