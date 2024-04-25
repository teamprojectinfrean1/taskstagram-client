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
};

const useFeedbackHandler = ({
  isError = false,
  errorAction,
  errorMessage = "처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  isSuccess = false,
  successAction,
  successMessage = "성공적으로 처리되었습니다.",
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
    }
  }, [isSuccess, successAction, successMessage, setSnackbar]);

  useEffect(() => {
    if (isError) {
      if (errorAction) errorAction();
      setSnackbar({
        show: true,
        message: errorMessage,
        severity: "error",
      });
    }
  }, [isError, errorAction, errorMessage, setSnackbar]);
};

export default useFeedbackHandler;
