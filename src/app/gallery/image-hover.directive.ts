import { Directive, ElementRef, HostListener, Input, Renderer, } from '@angular/core';
import * as _ from 'lodash';
import { ImageService } from '../image.service';

@Directive({
  selector: '[appImageHover]'
})
export class ImageHoverDirective {
  images;
  constructor(public el: ElementRef, public renderer: Renderer, public imageService: ImageService) { }

  @HostListener('mouseover') onMouseEnter() {
    if (event.target['id'] === "image") {
      this.hoverFocus(event['path'][0].src);
    }
  }

  @HostListener('mouseout') onMouseLeave() {
    if (event['fromElement']['alt'] == '' || event['fromElement']['alt'] == undefined) {
      this.hoverBlur();
    }
  }

  @HostListener('click', ['$event.target']) onMouseClick(event: KeyboardEvent) {
    if (event['id'] == 'image') {
      document.getElementById('myModal').style.display = "block";
      this.openLightbox(event);
    }
  }

  @HostListener('document:keydown', ['$event']) onKeyPress(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      document.getElementById('myModal').style.display = "none";
    }
    if (event.key == "ArrowLeft") {
      this.navigateLeft(this.el.nativeElement.querySelector('.myImage'));
    }
    if (event.key == "ArrowRight") {
      this.navigateRight(this.el.nativeElement.querySelector('.myImage'));
    }
  }

  public hoverFocus(image) {
    let zoom = this.el.nativeElement.querySelector('.zoom--effect');
    this.renderer.setElementStyle(zoom, 'display', 'block');
    let img = this.el.nativeElement.querySelector('.dynamicImage');
    this.renderer.setElementAttribute(img, 'src', image);
  }

  public hoverBlur() {
    let zoom = this.el.nativeElement.querySelector('.zoom--effect');
    this.renderer.setElementStyle(zoom, 'display', 'none');
    let img = this.el.nativeElement.querySelector('.dynamicImage');
    this.renderer.setElementAttribute(img, 'src', '');
  }

  openLightbox(event) {
    this.images = this.imageService.getImages();
    let img = this.el.nativeElement.querySelector('.myImage');
    this.renderer.setElementAttribute(img, 'src', `${event['src']}`);
    let demo = this.el.nativeElement.querySelector('.demo');
  }

  navigateLeft(args) {
    let id = _.indexOf(_.map(this.images, "img"), args.src) - 1;
    if (id > -1) {
      this.renderer.setElementAttribute(this.el.nativeElement.querySelector('.myImage'), 'src', this.images[`${id}`].img)
    }
  }

  navigateRight(args) {
    let id = _.indexOf(_.map(this.images, "img"), args.src) + 1;
    if (id < this.images.length) {
      this.renderer.setElementAttribute(this.el.nativeElement.querySelector('.myImage'), 'src', this.images[`${id}`].img)
    }
  }

}