import { useMutation } from "@tanstack/react-query";
import { translateText } from "../api/translate.api";

export const useTranslate = () => {
  return useMutation({
    mutationFn: translateText,
  });
};
