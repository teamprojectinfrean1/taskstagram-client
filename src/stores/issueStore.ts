import { atom } from 'recoil';

export const currentIssueIdToShowInModal = atom({
  key: 'currentIssueIdToShowInModal',
  default: '',
});