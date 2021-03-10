import { toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notify.css';

const fade = cssTransition({
  enter: 'slide-in-right',
  exit: 'slide-out-right',
});

const notify = (param = '', text) => {
  toast.error(` ${param} ${text}`, {
    transition: fade,
    autoClose: 2000,
    closeButton: false,
    hideProgressBar: true,
  });
};
export default notify;
