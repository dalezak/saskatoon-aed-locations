import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, Loading, LoadingController, Toast, ToastController, Alert, AlertController } from 'ionic-angular';

import { RssService } from '../../providers/rss-service';

import { Location } from '../../models/location';

import { DetailsPage } from '../../pages/details/details';

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
  providers: [ RssService ],
  entryComponents:[ DetailsPage ]
})
export class ListingPage {

  locations:any[] = [];

  constructor(
    protected rss:RssService,
    protected platform:Platform,
    protected navParams:NavParams,
    protected navController:NavController,
    protected toastController:ToastController,
    protected alertController:AlertController,
    protected loadingController:LoadingController) {
  }

  ionViewWillEnter() {
    this.loadLocations(true);
  }

  loadLocations(cache:boolean, event:any=null) {
    return this.rss.getLocations(cache).then((locations:Location[]) => {
      this.locations = locations;
      if (event) {
        event.complete();
      }
    },
    (error:any) => {
      console.error(error);
      if (event) {
        event.complete();
      }
      this.showToast(JSON.stringify(error));
    });
  }

  refreshLocations(cache:boolean) {
    let loading = this.showLoading("Loading...");
    this.loadLocations(cache).then(done => {
      loading.dismiss();
    },
    (error:any) => {
      this.showToast(JSON.stringify(error));
    });
  }

  showDetails(location:Location) {
    this.navController.push(DetailsPage,
      { location: location } );
  }

  showLoading(message:string):Loading {
    let loading = this.loadingController.create({
      content: message
    });
    loading.present();
    return loading;
  }

  showToast(message:string, duration:number=1500):Toast {
    let toast = this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
    return toast;
  }

  showAlert(title:string, subTitle:string, buttons:any=['OK']):Alert {
    let alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
    return alert;
  }

}
