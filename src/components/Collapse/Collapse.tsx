import { useContext } from 'react';
import styles from './_Collapse.module.scss';
import { Context, IContextValue, IProps } from '../../context/context';

const Collapse = ({ children }: IProps) => {
  const { onTransitionEnd, childrenDivRef } = useContext<Partial<IContextValue>>(Context);

  return (
    <>
      <div ref={childrenDivRef} onTransitionEnd={onTransitionEnd} className={styles.motionCollapse}>
        {children}
      </div>
    </>
  );
};

export default Collapse;
