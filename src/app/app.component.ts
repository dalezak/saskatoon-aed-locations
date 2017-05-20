import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ListingPage } from '../pages/listing/listing';

@Component({
  templateUrl: 'app.html'
})
export class SaskatoonApp {

  rootPage:any = ListingPage;

  constructor(
    private platform:Platform,
    private statusBar:StatusBar,
    private splashScreen:SplashScreen,
    private inAppBrowser:InAppBrowser) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  showCityOfSaskatoon() {
    let browser = this.inAppBrowser.create('https://www.saskatoon.ca', '_system');
    browser.show();
  }

  showOpenDataCatalogue() {
    let browser = this.inAppBrowser.create('http://opendata-saskatoon.cloudapp.net', '_system');
    browser.show();
  }

}
