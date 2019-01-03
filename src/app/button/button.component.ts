import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})

export class ButtonComponent implements OnInit {
  
  @Input() label: string;
  @Input() customClass: string;
  @Input() disabledButton: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}
