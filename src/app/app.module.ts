import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { SaskatoonApp } from './app.component';

import { ListingModule } from '../pages/listing/listing.module';
import { DetailsModule } from '../pages/details/details.module';

import { RssService } from '../providers/rss-service';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    SaskatoonApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PipesModule,
    ListingModule,
    DetailsModule,
    IonicModule.forRoot(SaskatoonApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    SaskatoonApp
  ],
  providers: [
    { provide: Device, useClass: Device },
    { provide: StatusBar, useClass: StatusBar },
    { provide: SplashScreen, useClass: SplashScreen },
    { provide: NativeGeocoder, useClass: NativeGeocoder },
    { provide: InAppBrowser, useClass: InAppBrowser },
    { provide: SocialSharing, useClass: SocialSharing },
    { provide: NativeStorage, useClass: NativeStorage },
    { provide: RssService, useClass: RssService },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
