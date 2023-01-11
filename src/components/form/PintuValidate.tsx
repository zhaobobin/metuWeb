/**
 * 拼图验证码
 * no [Number] 序列号
 * callback [Function] 返回 true 或 false
 */
import { useEffect } from 'react';
import Pintu from './Pintu';

interface IProps {
  no?: number;
  callback: (res: boolean) => void;
}

const PintuValidate = (props: IProps) => {
  let startX: number;
  let startY: number;

  useEffect(() => {
    init();
    document.addEventListener('touchstart', getStart);
    document.addEventListener('touchmove', stopTouch, { passive: false });
    return () => {
      document.removeEventListener('touchstart', getStart);
      document.removeEventListener('touchmove', stopTouch);
    };
  }, []);

  useEffect(() => {
    reset();
  }, [props.no]);

  const getStart = (e) => {
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
  };

  const stopTouch = (e) => {
    const moveX = e.targetTouches[0].pageX;
    const moveY = e.targetTouches[0].pageY;
    if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
      e.preventDefault();
    }
  };

  //初始化
  const init = () => {
    Pintu.init({
      el: document.getElementById('captcha'),
      onSuccess: function () {
        result(true);
      },
      onFail: function () {
        result(false);
      },
      onRefresh: function () {
        result(false);
      },
    });
  };

  //重置拼图
  const reset = () => {
    const captcha = document.getElementById('captcha');
    if (captcha) {
      captcha.innerHTML = '';
    }
    init();
  };

  //拼图回调
  const result = (res: boolean) => {
    props.callback(res);
  };

  const width = document.body.clientWidth > 320 ? '320px' : '100%';
  return (
    <div
      className="pintu"
      style={{
        width: width,
        margin: 'auto',
        padding: '5px 0',
        overflow: 'hidden',
      }}
    >
      <div id="captcha" />
    </div>
  );
};

export default PintuValidate;
