import { toast } from 'react-hot-toast';

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  warning: (message) => toast(message, { icon: '⚠️' }),
  info: (message) => toast(message, { icon: 'ℹ️' }),
};
