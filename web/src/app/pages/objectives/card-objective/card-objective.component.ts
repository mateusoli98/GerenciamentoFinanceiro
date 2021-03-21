import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-objective',
  templateUrl: './card-objective.component.html',
  styleUrls: ['./card-objective.component.scss']
})
export class CardObjectiveComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
