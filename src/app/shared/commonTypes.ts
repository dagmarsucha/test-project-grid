export type GridType = 'mosaic' | 'regular';
// One option of the styles select; the API only sends and expects `value`
export interface StylesType {
  title: string;
  set: string;
  icon: string;
  value: string;
}

export interface DisplayType {
  title: string;
  icon: string;
  value: string;
}

// Response of the component load endpoint
export interface IComponentResponse {
  display: string;
  darktheme: boolean;
  title: string;
  subtitle: string;
  styles: string;
  loadmore: boolean;
  permissions: boolean;
  rowsVisible: number;
  background: IBackground;
  animations: IAnimations;
  parallax: IParallax;
  items: ISettings[];
  copyLanguages: boolean;
  userGroups: IUserGroup[];
  languages: ILanguage[];
  pages: IPage[];
}

// Response fields the app never edits. The store still keeps them, because the
// save endpoint expects them back unchanged.
export type ReadOnlyResponseField =
  | 'permissions'
  | 'animations'
  | 'parallax'
  | 'userGroups'
  | 'languages'
  | 'pages';

// The part of the response the settings form edits
export type IComponentSettings = Omit<IComponentResponse, ReadOnlyResponseField>;

export interface IAnimations {
  appearing: {
    name: string | null;
  };
  hover: {
    name: string | null;
    overlayColor: string;
    overlayOpacity: string;
    textColor: string;
    iconColor: string;
  };
}

export interface IParallax {
  speed: number;
  direction: string;
  show: boolean;
}

export interface IUserGroup {
  id: number;
  text: string;
}

export interface ILanguage {
  language: string;
  link: string;
}

export interface IPage {
  id: number;
  name: string;
}

// One item of IComponentResponse.items
export interface ISettings {
  id: number;
  icon: string;
  text: string;
  additionalText: string | null;
  positive: number;
  link: string;
  target: string;
  targetNumber: number;
  selectedPage: null;
  selectedUserGroups: unknown[];
  background: IBackground;
}

export interface IBackground {
  imagePath: string;
  imageName: string;
  color: string;
  gradient: string;
  position: string;
  opacity: string;
  isVideo: boolean;
  asset: IAsset | null;
}

export interface IAsset {
  id: number;
  obtId: number;
  specId: number;
  url: string;
  isCropped: boolean;
  isVideo: boolean;
}
