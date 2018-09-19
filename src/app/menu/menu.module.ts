import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuService } from './shared/menu.service';

import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuComponent } from './menu.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    MenuService,
  ],
  declarations: [
    MenuComponent,
    MenuCardComponent,
  ],
  exports: [
    MenuComponent,
  ],
  entryComponents: [
  ],
})
export class MenuModule { }
