import React from "react"
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, SortEnum } from '../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: SortEnum
};

type PopupClick = MouseEvent & {path: Node[]}

type SortPopupProps = {
    value: SortItem
}


export const list: SortItem[] = [
  { name: "пулярности (DESC)", sortProperty: SortEnum.RATING_DESC },
  { name: "пулярности (ASC)", sortProperty: SortEnum.RATING_ASC },
  { name: "цене (DESC)", sortProperty: SortEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortEnum.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProperty: SortEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortEnum.TITLE_ASC },
];


const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  useWhyDidYouUpdate("SortPopup", {value});
  const dispatch = useDispatch();
  const [isOpen, setOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickSort = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickSort);

    return () => {
      document.body.removeEventListener("click", handleClickSort);
    };
  }, []);

  const sortName = value.name;
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={(e) => {
            setOpen((prev) => !prev);
          }}
        >
          по {sortName}
        </span>
      </div>
      {isOpen ? (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                className={
                  obj.sortProperty === value.sortProperty ? "active" : ""
                }
                onClick={() => {
                  onClickListItem(obj);
                }}
                key={i}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
})

export default SortPopup