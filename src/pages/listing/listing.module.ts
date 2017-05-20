import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingPage } from './listing';

@NgModule({
  declarations: [
    ListingPage,
  ],
  imports: [
    IonicPageModule.forChild(ListingPage),
  ],
  exports: [
    ListingPage
  ]
})
export class ListingModule {}
