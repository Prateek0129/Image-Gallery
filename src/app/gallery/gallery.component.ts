import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images;
  constructor(public el: ElementRef, public renderer: Renderer, public imageService: ImageService) { }
  ngOnInit() {
    this.getImages();
  }
  getImages() {
    this.images = this.imageService.getImages();
  }
  onClose() {
    this.imageService.onClose();
  }
  currentSlide(image, description) {
    this.renderer.setElementAttribute(this.el.nativeElement.querySelector('.myImage'), 'src', image);
  }
}
