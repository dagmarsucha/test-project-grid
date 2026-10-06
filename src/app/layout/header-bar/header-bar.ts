import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { papirflyIconsHome } from '@papirfly-ui/icons';

@Component({
  selector: 'app-header-bar',
  imports: [PfIconModule, PfxTranslateDynamicPipe, RouterLink],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.scss',
})
export class HeaderBar {
  constructor(private _iconsRegistryService: IconsRegistryService) {
    this._iconsRegistryService.registerIcons([papirflyIconsHome]);
  }
}
