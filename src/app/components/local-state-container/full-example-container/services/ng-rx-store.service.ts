import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LocalStateService} from '../../../../addons/local-state$-service/local-state';
import {getRandomAttendees, getRandomCity} from '../random';

// Requires a model

@Injectable({
  providedIn: 'root'
})
export class NgRxStoreService {

  private store = new LocalStateService();
  storeState$ = this.store.state$;

  constructor(private http: HttpClient) {
    this.updateAttendees();
    this.updateCities();
  }

  updateAttendees() {
    //  https://my-json-server.typicode.com/<your-username>/<your-repo>
    /*this.http.get('https://swapi.co/api/people/')
      .pipe(
        expand((r: any) => 'next' in r ? this.http.get(r.next) : EMPTY),
        map(r => r.results),
        map(a => a.map(i => (
            ({name, hair_color, skin_color, created}) =>
              ({name, hair_color, skin_color, id: Math.random()}))(i)
          )
        ),
        // catchError(_ => of(getRandomAttendees(30)))
      )
      .subscribe(
        attendees => {
          this.store.setSlice({attendees});
        }
      );*/
    setTimeout(() => {
      this.store.setSlice({attendees: getRandomAttendees(30)});
    }, 2000);
  }

  updateCities() {
    setTimeout(() => {
      console.log('updateCities');
      this.store.setSlice({cities: getRandomCity(5, 10)});
    }, 2000);
  }
}
