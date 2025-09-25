import { useState, useCallback } from 'react';

type ConfirmDialogState = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

type ShowConfirmOptions = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const useConfirmDialog = () => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
  });

  const showConfirm = useCallback(
    (options: ShowConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        const handleConfirm = () => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          resolve(true);
        };

        const handleCancel = () => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          resolve(false);
        };

        setDialogState({
          isOpen: true,
          title: options.title,
          message: options.message,
          confirmText: options.confirmText,
          cancelText: options.cancelText,
          onConfirm: handleConfirm,
          onCancel: handleCancel
        });
      });
    },
    []
  );

  const hideConfirm = useCallback(() => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    dialogState,
    showConfirm,
    hideConfirm
  };
};