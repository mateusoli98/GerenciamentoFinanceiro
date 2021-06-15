import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toggleMainDrawerAction } from 'src/app/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public drawer$: Observable<any> | undefined;
  public toggle: any;

  constructor(
    private store: Store<{ DrawerReducer: boolean }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.drawer$ = this.store.pipe(select('DrawerReducer'));
    this.drawer$.subscribe((res) => (this.toggle = res.toggle));
  }

  toggleMenu() {
    this.store.dispatch(toggleMainDrawerAction());
  }

  logout() {
    this.authService.logout();
  }
}
