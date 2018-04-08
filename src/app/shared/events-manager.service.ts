import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EventsManagerService {

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInEmitter: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor() {}

  isLoggedIn(ifLoggedIn: boolean) {
      this._isLoggedIn.next(ifLoggedIn);
  }

}
