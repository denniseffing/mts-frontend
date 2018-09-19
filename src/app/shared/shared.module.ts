import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';

import { AssistantsValidatorDirective } from './directives/assistant-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { ErrorMessageComponent } from './errorMessage/errorMessage.component';


@NgModule({
  imports: [ CommonModule, CoreModule, TranslateModule ],
  declarations: [
    EmailValidatorDirective,
    AssistantsValidatorDirective,
    EqualValidatorDirective,
    ErrorMessageComponent,
  ],
  exports: [
    EmailValidatorDirective,
    AssistantsValidatorDirective,
    EqualValidatorDirective,
    CommonModule,
    ErrorMessageComponent,
  ],
})

export class SharedModule { }
