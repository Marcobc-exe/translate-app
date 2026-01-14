import { useTranslate } from "../../hooks/useTranslate";
import { BtnTranslate } from "../buttons/BtnTranslate";
import { Input } from "../Inputs/Input";
import { TextTranslated } from "../messages/TextTranslated";
import { TranslateMessages } from "../messages/TranslateMessages";

export const Translator = () => {
  const { mutate, data, isError, isPending } = useTranslate();

  const handleOnChangeInput = (value: string) => {
    if (!value.length) return;
    handleTranslate(value.trim());
  };

  const onClickTranslate = () => {
    handleTranslate();
  };

  const handleTranslate = (text?: string) => {
    mutate({
      text: text ?? "Hello world",
      source: "en",
      target: "es",
    });
  };

  return (
    <>
      <Input handleOnChangeInput={handleOnChangeInput} />
      <BtnTranslate isPending={isPending} onClickTranslate={onClickTranslate} />
      <TranslateMessages isError={isError} isPending={isPending} />
      <TextTranslated data={data} />
    </>
  );
};
