/**
 * 账户 - 封面图
 */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Button, Modal, Upload, notification } from 'antd';
import { file2base64, createRandomId } from '@/utils/utils';
import { IRootState } from '@/models';
import styles from './account-header-cover.less';

import defauleBanner from '@/assets/banner.jpg';
import PhotoCrop from '@/blocks/photo/photo-crop';

interface IState {
  editVisible: boolean;
  uploadMessage: string;
  file: any; //选取的图片文件
  base64: string; //裁剪用，待上传图片
  scrollY: number;
  detail: any;
  modalVisible: boolean;
}

const AccountHeaderCover = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IRootState) => state.account.currentUser,
  );
  const userDetail = useSelector((state: IRootState) => state.user.userDetail);

  let ajaxFlag = true;

  const initialState: IState = {
    editVisible: false,
    uploadMessage: '',
    file: '',
    base64: '',
    scrollY: 0,
    detail: null,
    modalVisible: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    window.scrollTo(0, document.body.clientWidth * 0.25);
    window.addEventListener('scroll', handleScroll, false);
    return () => {
      cancelBanner();
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  //监控滚动
  const handleScroll = () => {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    setState({
      ...state,
      scrollY,
    });
  };

  //上传限制，文件类型只能是jpg、png，文件大小不能超过2mb.
  const beforeUpload = (file) => {
    let isImg =
      file.type.split('/')[1] === 'jpeg' || file.type.split('/')[1] === 'png';
    if (!isImg) notification.error({ message: '只能上传jpg、png图片文件!' });

    let isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) notification.error({ message: '图片文件的大小不能超过2MB!' });

    return isImg && isLt2M;
  };

  const handleUpload = ({ file }) => {
    file2base64(file, function (data) {
      // console.log(data)
      if (data.width < 1000 || data.height < 400) {
        notification.error({
          message: '背景图片要求：宽度>=1000px，高度>=400px',
        });
      } else {
        setState({
          ...state,
          editVisible: true,
          file: file,
          base64: data.url,
        });
      }
    });
  };

  const uploadOss = () => {
    if (!ajaxFlag) return;
    ajaxFlag = false;

    let { file, base64 } = state;
    const uid = userDetail._id;
    //console.log(file)

    setState({ ...state, uploadMessage: '上传中，请稍后...' });

    let option = {
      uid,
      category: 'banner',
      name: file.name.split('.')[0],
      id: createRandomId(),
      type: file.name.split('.')[1],
    };
    let key =
      option.uid + '/' + option.category + '_' + option.id + '.' + option.type;

    dispatch({
      type: 'oss/uploadBase64',
      payload: {
        key: key,
        base64: base64,
      },
      callback: (url) => {
        // console.log(url)
        ajaxFlag = true;

        dispatch({
          type: 'user/updateUserCover',
          payload: {
            url,
          },
          callback: (res: any) => {
            if (res.code === 0) {
              setState({
                ...state,
                detail: res.data,
                editVisible: false,
                uploadMessage: '',
              });
            } else {
              notification.error({
                message: '更新错误！',
                description: res.message,
              });
              cancelBanner();
            }
          },
        });
      },
    });
  };

  //裁剪结果
  const photoCropResult = (base64: string) => {
    console.log(base64);
    // setState({ ...state, base64 })
  };

  //确定
  const saveBanner = () => {
    uploadOss();
  };
  //取消
  const cancelBanner = () => {
    setState({ ...state, editVisible: false, uploadMessage: '', base64: '' });
  };

  const { editVisible, uploadMessage, base64, scrollY } = state;

  const bannerUrl = userDetail.cover_url
    ? 'url(' + userDetail.cover_url + '?x-oss-process=style/cover)'
    : 'url(' + defauleBanner + ')';

  return (
    <div
      className={styles.accountHeaderCover}
      style={{
        backgroundImage: bannerUrl,
        transform: `translate3d(0px, ${scrollY / 2}px, 0px)`,
      }}
    >
      {uploadMessage && (
        <p className={styles.uploadMessage}>
          <span>{uploadMessage}</span>
        </p>
      )}

      {/* {currentUser._id === userDetail._id && (
        <Upload
          accept=".jpg,.png"
          className={styles.upload}
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={handleUpload}
        >
          <span className={styles.editBtn}>{'编辑封面 >'}</span>
        </Upload>
      )} */}

      {editVisible && (
        <div className={styles.editBanner}>
          <div className={styles.banner}>
            {/*<img src={base64} ref="uploadBanner"/>*/}
            <PhotoCrop
              src={base64}
              callback={photoCropResult}
              maxWidth={1600}
              option={{
                style: {
                  width: '100%',
                  height: '700px',
                },
                dragMode: 'move', //裁剪方式
                viewMode: 3, //视图模式
                autoCropArea: 1, //裁剪区域
                aspectRatio: 16 / 4, //裁剪比例
                guides: false, //裁剪框虚线
                center: false, //显示裁剪框中心的加号
                cropBoxResizable: false, //裁剪框能否缩放
                toggleDragModeOnDblclick: false, //能否切换裁剪方式
                highlight: false, //裁剪框高亮
                background: false, //显示画布背景
              }}
            />
          </div>
          <div className={styles.action}>
            {/* <span>拖拽图片，以调整图片位置</span> */}
            <p>
              <Button
                type="primary"
                className={styles.submit}
                onClick={saveBanner}
              >
                保存
              </Button>
              <Button className={styles.cancel} onClick={cancelBanner}>
                取消
              </Button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountHeaderCover;
