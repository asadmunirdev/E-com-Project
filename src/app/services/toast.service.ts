import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    const backgroundColor =
      type === 'success'
        ? 'linear-gradient(to right, #00b09b, #96c93d)'
        : 'linear-gradient(to right, #ff5f6d, #ffc371)';

    Toastify({
      text: message,
      duration: 3000,
      backgroundColor,
      close: true,
      className: 'toastify',
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
    }).showToast();
  }
}
