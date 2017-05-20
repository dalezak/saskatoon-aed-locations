import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingPage } from './listing';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ListingPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ListingPage),
  ],
  exports: [
    ListingPage
  ]
})
export class ListingModule {}
