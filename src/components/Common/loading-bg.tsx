interface IProps {
  className?: string;
  style?: any;
}

const LoadingBg = (props: IProps) => {
  const style = {
    margin: 'auto',
    width: '500px',
    height: '180px',
    background: `url(${require('@/assets/com/loading.gif')}) no-repeat center center`,
    ...props.style,
  };

  return <div className={props.className} style={style} />;
};

export default LoadingBg;
