import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-add-nota',
  templateUrl: './add-nota.page.html',
  styleUrls: ['./add-nota.page.scss'],
})
export class AddNotaPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
  }

  barCode() {
    this.barcodeScanner.scan().then(barcodeData => {
        // @ts-ignore
        this.produto.codigoBarra = barcodeData;
    }).catch(err => {
        console.log('Error', err);
    });
}

}
