import { Component, OnInit } from '@angular/core';
import {dataPosts} from './mockups';
@Component({
  selector: 'app-financial-education',
  templateUrl: './financial-education.component.html',
  styleUrls: ['./financial-education.component.scss']
})
export class FinancialEducationComponent implements OnInit {

  public posts = dataPosts;
  constructor() { }

  ngOnInit(): void {
  }

}
