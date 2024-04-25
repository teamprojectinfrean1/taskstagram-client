import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";

type useFeedbackHandlerParams = {
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
};

const useFeedbackHandler = ({
  isError = false,
  isLoading = false,
  isSuccess = false,
  successMessage = "성공적으로 처리되었습니다.",
  errorMessage = "처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
}: useFeedbackHandlerParams) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  useEffect(() => {
    if (isSuccess) {
      setSnackbar({
        show: true,
        message: successMessage,
        severity: "success",
      });
    }
  }, [isSuccess, successMessage, setSnackbar]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message: errorMessage,
        severity: "error",
      });
    }
  }, [isError, errorMessage, setSnackbar]);

  useEffect(() => {
    if (isLoading) {
      // spinner 보여주기
    } else {
      // spinner 그만 보여주기
    }
  }, [isLoading]);
};

export default useFeedbackHandler;
