import { Component } from '@angular/core';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';

@Component({
  selector: 'app-content',
  imports: [PfxTranslateDynamicPipe],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})
export class Content {}
