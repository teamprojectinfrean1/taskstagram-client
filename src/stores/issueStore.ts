import { atom } from 'recoil';

export const issueIdToShowInModalState = atom({
  key: 'issueIdToShowInModalState',
  default: '',
});