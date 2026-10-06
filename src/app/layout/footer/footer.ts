import { Component } from '@angular/core';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';

@Component({
  selector: 'app-footer',
  imports: [PfxTranslateDynamicPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
