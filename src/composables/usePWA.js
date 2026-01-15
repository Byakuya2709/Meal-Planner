// src/composables/usePWA.js
import { ref, onMounted } from 'vue';

export function usePWA() {
  const deferredPrompt = ref(null);
  const showInstallPrompt = ref(false);
  const isInstalled = ref(false);

  const canInstall = () => {
    return showInstallPrompt.value && !isInstalled.value;
  };

  const handleBeforeInstallPrompt = (e) => {
    // Ngăn mini-infobar tự động hiện trên mobile
    e.preventDefault();
    // Lưu event để dùng sau
    deferredPrompt.value = e;
    // Hiện nút cài đặt
    showInstallPrompt.value = true;
  };

  const handleAppInstalled = () => {
    // Ẩn nút cài đặt
    showInstallPrompt.value = false;
    isInstalled.value = true;
    deferredPrompt.value = null;
  };

  const installApp = async () => {
    if (!deferredPrompt.value) {
      return false;
    }

    // Hiện prompt cài đặt
    deferredPrompt.value.prompt();

    // Đợi user chọn
    const { outcome } = await deferredPrompt.value.userChoice;

    if (outcome === 'accepted') {
      console.log('User đã cài đặt PWA');
      showInstallPrompt.value = false;
    } else {
      console.log('User từ chối cài đặt PWA');
    }

    // Clear prompt
    deferredPrompt.value = null;

    return outcome === 'accepted';
  };

  onMounted(() => {
    // Kiểm tra xem đã cài đặt chưa
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled.value = true;
      showInstallPrompt.value = false;
    }

    // Lắng nghe event beforeinstallprompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Lắng nghe event appinstalled
    window.addEventListener('appinstalled', handleAppInstalled);
  });

  return {
    canInstall,
    installApp,
    showInstallPrompt,
    isInstalled
  };
}