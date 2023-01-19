/**
 * 账户 - 图片
 */
import { useState } from 'react';
import { useSelector } from 'umi';
import { IRootState } from '@/models';

import PhotoListQuery from '@/blocks/photo/photo-list-query';
import CusEmpty from '@/components/common/cus-empty';

const AccountPhotos = () => {
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  const [count, setCount] = useState(0);

  const queryCallback = (count: number) => {
    setCount(count);
  };

  const url = `/users/${userDetail._id}/photos`;
  const showEdit = currentUser._id === userDetail._id;

  return (
    <div>
      <PhotoListQuery
        url={url}
        category=""
        callback={queryCallback}
        showEdit={showEdit}
      />

      {count === 0 ? <CusEmpty /> : null}
    </div>
  );
};

export default AccountPhotos;
