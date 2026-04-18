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
      // ✅ Create AudioContext IMMEDIATELY on gesture (inside activation window)
      // Then schedule sound start using ctx.currentTime + delay
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        gainNode.gain.value = 0;
        oscillator.frequency.value = 1;

        const startAt = ctx.currentTime + delayMs / 1000; // ← Web Audio clock
        oscillator.start(startAt);
        oscillator.stop(startAt + 0.01);
      } catch (e) {}

    } else {
      // Android: pre-register vibration immediately with pattern delays built-in
      if (navigator.vibrate) {
        const patterns = {
          light: [30],
          medium: [60],
          heavy: [100],
        };

        const pattern = patterns[type] || [60];

        if (delayMs > 0) {
          // ✅ Use vibrate's own silence pattern — no setTimeout needed!
          // [silence, vibrate] — all inside ONE vibrate() call on the gesture
          navigator.vibrate([delayMs, ...pattern]);
        } else {
          navigator.vibrate(pattern);
        }
      }
    }
  };

  return { trigger };
};

export default useHaptic;

