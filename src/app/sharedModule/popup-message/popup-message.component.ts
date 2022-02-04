import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-popup-message",
  templateUrl: "./popup-message.component.html",
  styleUrls: ["./popup-message.component.css"],
})
export class PopupMessageComponent implements OnInit {
  showElement: Boolean = true;

  @Input() msg: String = "";

  constructor() {
    setTimeout(() => {
      this.showElement = false;
    }, 5000);
  }

  ngOnInit(): void {}
}
