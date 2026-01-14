import { useState, type ChangeEvent } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { BtnTranslate } from "../buttons/BtnTranslate";
import { Input } from "../Inputs/Input";
import { TextTranslated } from "../messages/TextTranslated";
import { TranslateMessages } from "../messages/TranslateMessages";
import { SelectSourceLan, SelectTargetLan } from "../Selects/SelectLanguage";

export const Translator = () => {
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("es");
  const { mutate, data, isError, isPending } = useTranslate();

  const handleSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
  };

  const handleTargetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTarget(e.target.value);
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.value.length) return;
    handleTranslate(e.target.value.trim());
  };

  const onClickTranslate = () => {
    handleTranslate();
  };

  const handleTranslate = (text?: string) => {
    mutate({
      text: text ?? "",
      source: source,
      target: target,
    });
  };

  return (
    <>
      <div>
        <SelectSourceLan
          source={source}
          handleSourceChange={handleSourceChange}
        />
        <Input handleOnChangeInput={handleOnChangeInput} />
        <BtnTranslate isPending={isPending} onClickTranslate={onClickTranslate} />
      </div>
      <TranslateMessages isError={isError} isPending={isPending} />
      <SelectTargetLan
        target={target}
        handleTargetChange={handleTargetChange}
      />
      <TextTranslated data={data} />
    </>
  );
};
