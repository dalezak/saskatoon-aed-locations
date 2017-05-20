import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage } from './details';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DetailsPage,
  ],
  imports: [
    PipesModule,
    LazyLoadImageModule,
    IonicPageModule.forChild(DetailsPage),
  ],
  exports: [
    DetailsPage
  ]
})
export class DetailsModule {}
