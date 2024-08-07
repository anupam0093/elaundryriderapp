
export interface Authentication {
  token: string;
}

export type Login = {
  username: string;
  password: string;
};


export type RootStackParamList = {
  ImageGallery: undefined;
  ImageViewer: { uri: string };
};
