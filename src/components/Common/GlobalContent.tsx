import styles from './GlobalContent.less'

interface IProps {
  children: HTMLElement
}

const GlobalContent = (props: IProps) => {
  return(
    <div className={styles.container}>
      {props.children}
    </div>
  )
};

export default GlobalContent
