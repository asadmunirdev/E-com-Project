// not-found.component.ts
import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements AfterViewInit {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  word_arr: { x: number; y: number; text: string; size: number }[] = [];
  txt_min_size = 5;
  txt_max_size = 25;
  keypress = false;
  acclerate = 2;

  ngAfterViewInit() {
    this.canvas = document.createElement('canvas');
    if (this.canvas) {
      this.canvas.height = this.height;
      this.canvas.width = this.width;
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
        document.body.appendChild(this.canvas);
        this.initializeWords();
        this.render();
      }
    }
  }

  initializeWords() {
    for (let i = 0; i < 25; i++) {
      this.word_arr.push({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        text: '404',
        size: this.random(this.txt_min_size, this.txt_max_size)
      });
      this.word_arr.push({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        text: 'page',
        size: this.random(this.txt_min_size, this.txt_max_size)
      });
      this.word_arr.push({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        text: 'not found',
        size: this.random(this.txt_min_size, this.txt_max_size)
      });
      this.word_arr.push({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        text: '404',
        size: Math.floor(this.random(this.txt_min_size, this.txt_max_size))
      });
    }
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
  }

  range_map(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    if (this.ctx && this.canvas) {
      this.ctx.fillStyle = "rgba(0,0,0,1)";
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.fillStyle = "#fff";
      for (let i = 0; i < this.word_arr.length; i++) {
        this.ctx.font = `${this.word_arr[i].size}px sans-serif`;
        const w = this.ctx.measureText(this.word_arr[i].text);
        this.ctx.fillText(this.word_arr[i].text, this.word_arr[i].x, this.word_arr[i].y);

        if (this.keypress) {
          this.word_arr[i].x += this.range_map(this.word_arr[i].size, this.txt_min_size, this.txt_max_size, 2, 4) * this.acclerate;
        } else {
          this.word_arr[i].x += this.range_map(this.word_arr[i].size, this.txt_min_size, this.txt_max_size, 2, 3);
        }

        if (this.word_arr[i].x >= this.width) {
          this.word_arr[i].x = -w.width * 2;
          this.word_arr[i].y = this.random(0, this.height);
          this.word_arr[i].size = Math.floor(this.random(this.txt_min_size, this.txt_max_size));
        }
      }

      this.ctx.fill();
      requestAnimationFrame(() => this.render());
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.keypress = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.keypress = false;
  }
}
