import styles from './index.less';
import UserLayout from './UserLayout'

function BaseLayout(props) {
  if (props.location.pathname.includes('/user/')) {
    return <UserLayout>{ props.children }</UserLayout>
  }
  return <div className={styles.container}>{props.children}</div>;
}

export default BaseLayout;
