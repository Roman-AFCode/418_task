import { useContext } from 'react';
import { Context, IContextValue, IProps } from '../../context/context';
import styles from './_Header.module.scss';

const Header = ({ children }: IProps) => {
  const { visible, handleButtonClick } = useContext<Partial<IContextValue>>(Context);

  return (
    <div className={styles.header}>
      <button onClick={handleButtonClick}>{visible ? '👇' : '👉'}</button>
      <h3>Header</h3>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Header;
