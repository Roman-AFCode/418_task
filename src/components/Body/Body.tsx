import styles from './_Body.module.scss';
import List from '../List/List';
import Collapse from '../Collapse/Collapse';

const Body = () => {
  return (
    <div className={styles.body}>
      <Collapse>
        <List />
      </Collapse>
    </div>
  );
};

export default Body;
