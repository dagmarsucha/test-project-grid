import { A11yModule } from '@angular/cdk/a11y';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PfxTranslateDynamicPipe } from '@papirfly-ui/angular-extensions/translate';
import { IconsRegistryService, PfIconModule } from '@papirfly-ui/angular/icon';
import { papirflyIconsDownload } from '@papirfly-ui/icons';
import imageData from '../shared/imageData.json';

@Component({
  selector: 'app-image-detail',
  imports: [RouterLink, PfxTranslateDynamicPipe, PfIconModule, A11yModule],
  templateUrl: './image-detail.html',
  styleUrl: './image-detail.scss',
})
export class ImageDetail {
  id = input.required<string>();
  url = input.required<string>();

  async downloadFile(url: string, fileName: string) {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Download failed: ${response.status}`);
      return;
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${fileName}.${blob.type.split('/')[1] ?? 'jpg'}`;
    link.click();

    URL.revokeObjectURL(blobUrl);
  }

  protected readonly image = computed(() => imageData.find((img) => img.id === Number(this.id())));

  constructor(private _iconsRegistryService: IconsRegistryService) {
    this._iconsRegistryService.registerIcons([papirflyIconsDownload]);
  }
}
