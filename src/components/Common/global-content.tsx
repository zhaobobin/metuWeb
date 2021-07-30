import styles from './global-content.less';

interface IProps {
  children: React.ReactNode;
}

const GlobalContent = (props: IProps) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default GlobalContent;
