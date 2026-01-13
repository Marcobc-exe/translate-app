import { useTranslate } from "../../hooks/useTranslate"

export const Translator = () => {
  const { mutate, data, isError, isPending } = useTranslate()

  const handleTranslate = () => {
    mutate({
      text: "Hellow world",
      source: "en",
      target: "es"
    })
  }

  return (
    <div>
      <button onClick={handleTranslate} disabled={isPending}>
        Translate
      </button>

      {isPending && <p>Translating...</p>}
      {isError && <p>Error translating text</p>}

      {data && (
        <p>Result: {data.responseData.translatedText}</p>
      )}
    </div>
  )
}