import { useContext } from 'react';
import { Context, IContextValue } from '../../context/context';
import styles from './_Footer.module.scss';

const Footer = () => {
  const { list, perPage, pagination } = useContext<Partial<IContextValue>>(Context);

  const pageNumbers = [];

  if (list && perPage) {
    for (let i = 1; i <= Math.ceil(list.length / perPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className={styles.footer}>
      <ul className="ul">
        {pageNumbers.map((number) => (
          <li className="li" key={number} onClick={() => pagination && pagination(number)}>
            <a href="!#" className="a" >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
