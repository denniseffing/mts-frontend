import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'public-error-message',
  templateUrl: './errorMessage.component.html',
  styleUrls: ['./errorMessage.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;

  constructor(
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
  }

}
