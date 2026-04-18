// hooks/useHaptic.js

const iosVibrate = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        gainNode.gain.value = 0; // silent — sirf haptic trigger ke liye
        oscillator.frequency.value = 1;
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.01);
    } catch (e) { }
};

const useHaptic = () => {
  const trigger = (type = 'medium', delayMs = 0) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // ❌ No web API exists for iOS haptics from a browser.
      // Only works if running inside a native WKWebView with a JS bridge.
      // AudioContext trick does NOT trigger vibration — it's a myth.
      console.warn('iOS haptics not supported in browser/PWA context.');
      return;
    }

    // ✅ Android / other — navigator.vibrate works
    if (!navigator.vibrate) return;

    const durations = {
      light:  30,
      medium: 60,
      heavy:  100,
    };

    const vibrateDuration = durations[type] ?? 60;

    if (delayMs > 0) {
      // Pattern: [vibrate, pause, vibrate]
      // First slot MUST be vibration (even if 0), second is pause, third is actual buzz
      navigator.vibrate([0, delayMs, vibrateDuration]);
    } else {
      navigator.vibrate([vibrateDuration]);
    }
  };

  return { trigger };
};

export default useHaptic;

