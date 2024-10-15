import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private getEmoji(type: 'success' | 'error' | 'warning' | 'info'): string {
    switch (type) {
      case 'success':
        return '🎉'; // Emoji for success
      case 'error':
        return '😢'; // Emoji for error
      case 'warning':
        return '⚠️'; // Emoji for warning
      case 'info':
        return 'ℹ️'; // Emoji for info
      default:
        return '';
    }
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    const emoji = this.getEmoji(type);
    const backgroundColor =
      type === 'success'
        ? 'linear-gradient(to right, #00b09b, #96c93d)'
        : 'linear-gradient(to right, #ff5f6d, #ffc371)';

    Toastify({
      text: `${emoji} ${message}`, // Add emoji automatically
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
