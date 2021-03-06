import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LocalStateService, selectSlice} from 'ng-re';
import {Subject} from 'rxjs';
import {map, share, switchMapTo} from 'rxjs/operators';
import {NgRxStoreService} from './services/ng-rx-store.service';

@Component({
  selector: 'app-full-example-container',
  template: `
    <h1>Full Example Local State Management</h1>
    <div style="width:100%">
      <button
        (click)="updateSelectedAttendees$.next()">
        update selected attendees
      </button>
    </div>
    <app-table
      style="float: left; width:45%"
      [state]="selectedAttendees$ | push$">
      <h2>Selected Attendees</h2>
    </app-table>
    <app-child-local-state-container
      style="float: left; width:45%"
      [selectedAttendeesIds]="selectedAttendeesIds$ | push$">
    </app-child-local-state-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    LocalStateService
  ]
})
export class FullExampleContainerComponent {
  updateSelectedAttendees$ = new Subject();

  selectedAttendees$ = this.updateSelectedAttendees$
    .pipe(
      switchMapTo(this.store.storeState$.pipe(selectSlice((s) => s.attendees))),
      map((a: any[]) => {
        const items = Array.from({length: 4}).map(_ => a[Math.floor(Math.random() * a.length)]);
        return items;
      }),
      // share the same reference of items
      share()
    );

  selectedAttendeesIds$ = this.selectedAttendees$
    .pipe(map(a => a.map(i => i.id)));

  constructor(private store: NgRxStoreService) {

  }

}
