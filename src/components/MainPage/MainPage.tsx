import Header from '../Header/Header';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';

import styles from './_MainPage.module.scss';
import { useContext } from 'react';
import { Context, IContextValue } from '../../context/context';

const MainPage = () => {
  const { visible } = useContext<Partial<IContextValue>>(Context);

  return (
    <div className={styles.main}>
      <h3>{visible ? 'развёрнуто' : 'свёрнуто'}</h3>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
};

export default MainPage;
