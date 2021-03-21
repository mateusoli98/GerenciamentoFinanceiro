import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();

  public form: FormGroup | any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      textSearch: ['', Validators.required],
    });
  }

  newItemEmit() {
    this.newItemEvent.emit(true);
  }
}
