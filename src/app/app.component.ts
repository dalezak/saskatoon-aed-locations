import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ListingPage } from '../pages/listing/listing';

@Component({
  templateUrl: 'app.html'
})
export class SaskatoonApp {

  rootPage:any = ListingPage;

  constructor(
    protected platform:Platform,
    protected statusBar:StatusBar,
    protected splashScreen:SplashScreen,
    protected themeableBrowser:ThemeableBrowser) {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  showUrl(url:string):ThemeableBrowserObject {
    let options:ThemeableBrowserOptions = {
       statusbar: {
           color: '#0b7a6a'
       },
       toolbar: {
           height: 44,
           color: '#0b7a6a'
       },
       title: {
           color: '#FFFFFF',
           showPageTitle: true
       },
       backButton: {
          wwwImage: 'assets/images/back.png',
          wwwImageDensity: 2,
          align: 'right',
          event: 'backPressed'
        },
        forwardButton: {
          wwwImage: 'assets/images/forward.png',
          wwwImageDensity: 2,
          align: 'right',
          event: 'forwardPressed'
        },
        closeButton: {
          wwwImage: 'assets/images/close.png',
          wwwImageDensity: 2,
          align: 'left',
          event: 'closePressed'
        },
       backButtonCanClose: true
     };
    let browser:ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    if (this.platform.is("ios")) {
      browser.show();
    }
    return browser;
  }

}
