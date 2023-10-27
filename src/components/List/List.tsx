import { useContext } from 'react';
import styles from './_List.module.scss';
import { Context, IContextValue } from '../../context/context';

const List = () => {
  const { listSlice } = useContext<Partial<IContextValue>>(Context);

  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {listSlice?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
