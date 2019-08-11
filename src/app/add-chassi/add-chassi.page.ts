import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-chassi',
  templateUrl: './add-chassi.page.html',
  styleUrls: ['./add-chassi.page.scss'],
})
export class AddChassiPage implements OnInit {

  foto;
  constructor(
    private camera: Camera,
  ) { }

  ngOnInit() {
  }
  
  tirarFoto() {
    const options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
        this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
        // Handle error
    });
}

}
