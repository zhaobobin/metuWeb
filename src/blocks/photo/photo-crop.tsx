/*
* 图片裁剪
* https://github.com/fengyuanchen/cropperjs#aspectratio
* src： 图片路径
* maxWidth：最大尺寸
* option：配置参数
* callback：返回base64
* example：
  <PhotoCrop src={base64}
    callback={this.photoCropResult}
    option={
      {
        style: {
          width: '100%',
          height: '382px',
        },
        dragMode: "move",                             //裁剪方式
        viewMode: 3,                                  //视图模式
        autoCropArea: 1,                              //裁剪区域
        aspectRatio: 16 / 4,                          //裁剪比例
        guides: false,                                //裁剪框虚线
        center: false,                                //显示裁剪框中心的加号
        cropBoxResizable: false,                      //裁剪框能否缩放
        toggleDragModeOnDblclick: false,              //能否切换裁剪方式
        highlight: false,                             //裁剪框高亮
        background: false,                            //显示画布背景
      }
    }
  />
* */
import { useRef } from 'react';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
  id?: string;
  src?: string; //图片源
  option?: any; //配置参数
  maxWidth?: number;
  callback: (dataUrl: string) => void;
}

export default function PhotoCrop(props: IProps) {
  const cropperRef = useRef<any>(null);

  const _crop = () => {
    const dataUrl = cropperRef.current.cropper
      .getCroppedCanvas({
        maxWidth: props.maxWidth,
        imageSmoothingQuality: 'high',
      })
      .toDataURL('image/jpeg');
    console.log(dataUrl);
    // props.callback(dataUrl);
  };

  return (
    <Cropper {...props.option} ref={cropperRef} src={props.src} crop={_crop} />
  );
}
