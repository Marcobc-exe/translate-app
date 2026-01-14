import type { FC } from "react";

type Props = {
  isPending: boolean;
  onClickTranslate: () => void;
};

export const BtnTranslate: FC<Props> = ({ isPending, onClickTranslate }) => {
  return (
    <button onClick={onClickTranslate} disabled={isPending}>
      Translate
    </button>
  );
};
