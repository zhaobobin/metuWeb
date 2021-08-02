import { Loading } from 'umi';
import global, { IGlobalState } from './global';
import home, { IHomeState } from './home';
import article, { IArticleState } from './article';
import photo, { IPhotoState } from './photo';
import user, { IUserState } from './user';
import account, { IAccountState } from './account';
import circle, { ICircleState } from './circle';
import comment, { ICommentState } from './comment';
import message, { IMessageState } from './message';
import oss, { IOssState } from './oss';
import publish, { IPublishState } from './publish';

const models = [
  global,
  home,
  article,
  photo,
  user,
  account,
  circle,
  comment,
  message,
  oss,
  publish,
];

export type RootState = {
  loading: Loading;
  global: IGlobalState;
  home: IHomeState;
  article: IArticleState;
  photo: IPhotoState;
  user: IUserState;
  account: IAccountState;
  circle: ICircleState;
  comment: ICommentState;
  message: IMessageState;
  oss: IOssState;
  publish: IPublishState;
};

export default models;
