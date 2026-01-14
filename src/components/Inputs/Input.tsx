import type { ChangeEvent, FC } from "react";

type Props = {
  handleOnChangeInput: (value: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Todo: handle input's size while user write down on it
 */
export const Input: FC<Props> = ({ handleOnChangeInput }) => {
  return (
    <input
      type="text"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleOnChangeInput(e)
      }
    />
  );
};
