import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-planning',
  templateUrl: './dialog-planning.component.html',
  styleUrls: ['./dialog-planning.component.scss'],
})
export class DialogPlanningComponent implements OnInit {
  public showForm: boolean = false;
  public isGroup: boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['João'];
  allFruits: string[] = ['João', 'Maria', 'José', 'Arnaldo'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | any;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | any;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  option(value: boolean) {
    this.isGroup = value;
    this.showForm = true;
  }
  resetOptions() {
    this.isGroup = false;
    this.showForm = false;
  }
}
