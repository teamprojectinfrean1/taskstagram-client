import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";

type useFeedbackHandlerParams = {
  isError?: boolean;
  errorAction?: () => void;
  errorMessage?: string;
  isSuccess?: boolean;
  successAction?: () => void;
  successMessage?: string;
  unconditionalExecute?: () => void;
};

const useFeedbackHandler = ({
  isError = false,
  errorAction,
  errorMessage = "처리 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
  isSuccess = false,
  successAction,
  successMessage = "성공적으로 처리되었습니다.",
  unconditionalExecute
}: useFeedbackHandlerParams) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  useEffect(() => {
    if (isSuccess) {
      if (successAction) successAction();
      setSnackbar({
        show: true,
        message: successMessage,
        severity: "success",
      });
    } else if (isError) {
      if (errorAction) errorAction();
      setSnackbar({
        show: true,
        message: errorMessage,
        severity: "error",
      });
    }
    if ((isSuccess || isError) && unconditionalExecute) {
      unconditionalExecute();  }
  }, [isSuccess, isError, successAction, errorAction, successMessage, errorMessage, unconditionalExecute, setSnackbar]);
};

export default useFeedbackHandler;
