import { useCallback } from 'react';

declare global {
  interface Window {
    M: any;
  }
}

const useMessage = () => {
  return useCallback((text: any) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};

export default useMessage;
