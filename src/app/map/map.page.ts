import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, MyLocation, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps';
 
// declarando uma variavel para pegar tudo o que vem da api 
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  //referrenciando o elemento map
  @ViewChild('map') mapElement: any;
  private loading: any;
  private map: GoogleMap;
  public search: string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  //Array onde ficarão armazenados os resultados retornados da pesquisa por lugares
  public searchResults = new Array<any>();
  private originMarker: Marker;
  public destination: any;
  private googleDirectionsService = new google.maps.DirectionsService();

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    //acessando o elemento nativo
    this.mapElement = this.mapElement.nativeElement;

    //setando a pagina para abrir como tela cheia
    this.mapElement.style.width = this.platform.width() + 'px'; 
    this.mapElement.style.height = this.platform.width() + 'px';
    
    this.loadMap();
  } 

  async loadMap(){
    //Criando um loading para rodar até o usuario permitir o uso da localização
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...'});
    await this.loading.present();

     //Esse código é necessário para o browser
     Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDwKRmu4J8rVSAV9VWvzDQ_sYey5Y1qKqU',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDwKRmu4J8rVSAV9VWvzDQ_sYey5Y1qKqU'
    });
    
    //Retirando os botões de zoom 
    const mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false
      }
    };
  
    this.map = GoogleMaps.create(this.mapElement, mapOptions);
    try {
    await this.map.one(GoogleMapsEvent.MAP_READY);

    this.addOriginMarker();
    } catch(error){
      console.error(error);
    }
  }

  async addOriginMarker() {
    try{
      //Pegando a localização atual do dispositivo
    const myLocation: MyLocation = await this.map.getMyLocation();

    //Movimentando a câmera para a localização atual
    await this.map.moveCamera({
      target: myLocation.latLng,
      zoom: 18
    });
    
    //Adicionando um marcador para indicar a localização
    this.originMarker = this.map.addMarkerSync({
      title: 'Origem',
      icon: '#000',
      annimation: GoogleMapsAnimation.DROP,
      position: myLocation.latLng
    })
  
    console.log(myLocation);
    } catch (error){
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  searchChanged() {
    //verificar se o campo esta em branco
    if (!this.search.trim().length) return;

    this.googleAutocomplete.getPlacePredictions({ input: this.search}, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
      this.searchResults = predictions;
    });
  }

  async calcRoute(item: any) {
    this.search = '';
    this.destination = item;

    const info: any = await Geocoder.geocode({address: this.destination.description})

    let markerDestination: Marker = this.map.addMarkerSync({
      title: this.destination.description,
      icon: '#000',
      animation: GoogleMapsAnimation.DROP,
      position: info[0].position
    });

    this.googleDirectionsService.route({
      origin: this.originMarker.getPosition(),
      destination: markerDestination.getPosition(),
      travelMode: 'DRIVING'
    }, async results => {
      console.log(results);
      const points = new Array<ILatLng>();

      const routes = results.routes[0].overview_path;

      for (let i = 0; i < routes.length; i++){
        points[i] = {
          lat: routes[i].lat(),
          lng: routes[i].lng()
        }
      }

      await this.map.addPolyline({
        points: points,
        color: '#000',
        width: 3
      });

      await this.map.moveCamera({target:points});
      this.map.panBy(0, 100);
    });
  }

  async back() {
    try{
      await this.map.clear();
      this.destination = null;
      this.addOriginMarker();
    }catch(error){
      console.log(error);
    }
  }
}
