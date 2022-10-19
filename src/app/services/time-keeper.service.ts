import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";


export class TimeKeeperService {
  get stepDelay(): number {
    return this._stepDelay;
  }

  set stepDelay(value: number) {
    this._stepDelay = value;
  }

  get clockStep(): number {
    return this._clockStep;
  }

  set clockStep(value: number) {
    this._clockStep = value;
  }

  private timerId: NodeJS.Timeout | null = null;
  private clockSubject: Subject<number>;
  private _clockStep: number = 0;
  private _stepDelay: number = 1000;

  constructor() {
    this.clockSubject = new Subject();
  }

  public getClockListener(): Observable<number> {
    return this.clockSubject.asObservable();
  }

  public startClock(): void {
    this.stopClock();
    this.timerId = setInterval(() => {
      this.clockSubject.next(this.clockStep++);
    }, this.stepDelay);
  }

  public stopClock(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

}

export const GlobalTime = new TimeKeeperService();
