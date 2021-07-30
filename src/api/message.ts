import { Request } from 'metu-ui/dist/utils/index';

type IType = 'favor' | 'comment' | 'follow' | 'collect' | 'mail' | 'notify';
interface IParams {
  type: IType;
  sent_to: string;
  page?: number;
  per_page?: number;
}
export const messageApi = {
  getMessageList: (params: IParams) => {
    return Request({
      url: '/messages',
      method: 'get',
      params,
    });
  },
};
