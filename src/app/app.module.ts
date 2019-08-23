import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageHoverDirective } from './gallery/image-hover.directive';
import { ImageService } from './image.service';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ImageHoverDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
