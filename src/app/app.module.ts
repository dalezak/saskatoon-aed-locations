import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IsDebug } from '@ionic-native/is-debug';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';

import { SaskatoonApp } from './app.component';
import { ListingPage } from '../pages/listing/listing';
import { DetailsPage } from '../pages/details/details';

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
    IonicModule.forRoot(SaskatoonApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    SaskatoonApp,
    ListingPage,
    DetailsPage
  ],
  providers: [
    { provide: IsDebug, useClass: IsDebug },
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
