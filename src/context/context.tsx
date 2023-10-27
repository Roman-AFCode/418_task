import {
  DependencyList,
  Dispatch,
  EffectCallback,
  FC,
  MutableRefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const Context = createContext({});

export interface IProps {
  children: React.ReactNode;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IContextValue {
  visible: boolean;
  list: IUser[];
  lastListIndex: number;
  firstListIndex: number;
  listSlice: IUser[];
  perPage: number;
  childrenDivRef: MutableRefObject<HTMLDivElement | null>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  handleButtonClick: () => void;
  useEffect: (effect: EffectCallback, deps?: DependencyList | undefined) => void;
  onTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
  setList: Dispatch<SetStateAction<IUser[]>>;
  pagination: (pageNumber: number) => void;
}

export const AppContext: FC<IProps> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [list, setList] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(4);
  const childrenDivRef = useRef<HTMLDivElement | null>(null);

  const lastListIndex = currentPage * perPage;
  const firstListIndex = lastListIndex - perPage;
  const listSlice = list.slice(firstListIndex, lastListIndex);
  console.log('listSlice ===>>>', listSlice);

  const pagination = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    const el = childrenDivRef.current;
    if (!el) return;

    if (visible) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = '1';
    } else {
      el.style.height = '0';
      el.style.opacity = '0';
    }
  }, [visible]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          {
            signal: signal,
          });
        const result = await response.json();
        setList(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    }
  }, []);

  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'height') {
      childrenDivRef.current?.classList.remove('motionCollapse');
    }
  };

  const handleButtonClick = () => {
    setVisible((prev) => !prev);
  };

  const contextValue: IContextValue = {
    visible,
    setVisible,
    handleButtonClick,
    useEffect,
    onTransitionEnd,
    childrenDivRef,
    list,
    setList,
    lastListIndex,
    firstListIndex,
    listSlice,
    pagination,
    perPage,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
