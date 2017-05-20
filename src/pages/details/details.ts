import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  location:Location;
  staticMap:string;
  googleMapsKey:string = "AIzaSyA_Mlv2Vz6OYNYVnnwNITcn9wbUdz-FXuA";

  constructor(
    protected navParams:NavParams,
    protected nativeGeocoder:NativeGeocoder,
    protected socialSharing:SocialSharing) {
  }

  ionViewWillEnter() {
    this.location = this.navParams.get("location");
    if (this.location.latitude && this.location.longitude) {
      this.loadStaticMap(this.location.latitude, this.location.longitude);
    }
    else {
      this.forwardGeocode(this.location.address);
    }
  }

  forwardGeocode(address:string) {
    this.nativeGeocoder.forwardGeocode(address)
      .then((coordinates: NativeGeocoderForwardResult) => {
        this.location.latitude = Number(coordinates.latitude);
        this.location.longitude = Number(coordinates.longitude);
        this.loadStaticMap(this.location.latitude, this.location.longitude);
      })
      .catch((error: any) => {
        this.location.latitude = null;
        this.location.longitude = null;
      });
  }

  loadStaticMap(latitude:number, longitude:number) {
    if (latitude && longitude) {
      this.staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=600x600&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${this.googleMapsKey}`
    }
    else {
      this.staticMap = null;
    }
  }

  shareDetails(event) {
    let message = this.location.description;
    let subject = this.location.name;
    let file = null;
    let image = this.staticMap;
    this.socialSharing.share(message, subject, file, image).then((shared) => {
      if (shared) {

      }
    }).catch(() => {

    });
  }

}
