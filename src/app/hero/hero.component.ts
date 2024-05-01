// @ts-nocheck
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Hero } from "../hero";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"],
})
export class HeroComponent {
  [x: string]: any;
  @Input() hero: Hero;
  @Output() delete = new EventEmitter();

  onDeleteClick($event): void {
    $event.stopPropagation();
    this.delete.next();
  }
}