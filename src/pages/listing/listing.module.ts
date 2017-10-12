import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingPage } from './listing';

import { PipesModule } from '../../pipes/pipes.module';

import { ApiService } from '../../providers/api-service';

@NgModule({
  declarations: [
    ListingPage,
  ],
  entryComponents: [
    ListingPage
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ListingPage),
  ],
  exports: [
    ListingPage
  ],
  providers: [ ApiService ]
})
export class ListingModule {}
