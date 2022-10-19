import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {BeatUIComponent} from './beat-ui/beat-ui.component';
import {MeasureUIComponent} from './measure-ui/measure-ui.component';
import {BeatContainerComponent} from './beat-container/beat-container.component';
import {BeatTrackUIComponent} from './beat-track-ui/beat-track-ui.component';
import {BeatCursorComponent} from './beat-cursor/beat-cursor.component';
import {BeatFrameUIComponent} from './beat-frame-ui/beat-frame-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    BeatUIComponent,
    MeasureUIComponent,
    BeatContainerComponent,
    BeatTrackUIComponent,
    BeatCursorComponent,
    BeatFrameUIComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  /**
   * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
   * This is good to prevent injecting the service as constructor parameter.
   */
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
