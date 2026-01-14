import type { FC } from "react";

type Props = {
  isPending: boolean;
  isError: boolean;
};

export const TranslateMessages: FC<Props> = ({ isError, isPending }) => {
  return (
    <>
      {isPending && <p>Translating...</p>}
      {isError && <p>Error translating text</p>}
    </>
  );
};
