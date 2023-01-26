import { FC, MouseEvent, ReactNode } from "react";
type Button = {
  children: ReactNode;
  spanCol?: number | string;
  rowSpan?: number;
  value: number | string;
  onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
};
const Button: FC<Button> = ({
  children,
  spanCol,
  rowSpan,
  value,
  onClickHandler,
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={`border border-gray-600 text-2xl p-3 bg-blue-600 col-span-${spanCol} row-span-${rowSpan}`}
      value={value}
    >
      {children}
    </button>
  );
};

export { Button };
