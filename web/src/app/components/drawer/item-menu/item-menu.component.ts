import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Input() router: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
