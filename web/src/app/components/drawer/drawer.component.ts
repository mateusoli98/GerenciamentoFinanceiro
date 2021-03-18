import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { routers } from './routers';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  public drawerState$: Observable<any> | undefined;
  public panelMenu: boolean = false;
  public routers = routers;

  constructor(private store: Store<{ DrawerReducer: any }>) {}

  ngOnInit(): void {
    this.drawerState$ = this.store.pipe(select('DrawerReducer'));
  }

  get toggle() {
    let toggle;
    this.drawerState$?.subscribe((result) => (toggle = result.toggle));
    return toggle;
  }
}
