import { atom } from "recoil";

type SeverityType = 'error' | 'warning' | 'info' | 'success';

type SnackbarStateType = {
  show: boolean;
  message: string;
  severity: SeverityType;
};

export const snackbarState = atom<SnackbarStateType>({
  key: 'snackbarState',
  default: {
    show: false,
    message: '',
    severity: 'info', 
  },
});
