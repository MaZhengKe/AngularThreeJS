import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ThreejsComponent } from './threejs/threejs.component';
import {GltfComponent} from "./threejs/gltf.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ThreejsComponent,
    GltfComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
