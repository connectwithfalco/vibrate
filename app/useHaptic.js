const iosVibrate = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    gainNode.gain.value = 0;
    oscillator.frequency.value = 1;

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.01);
  } catch (e) {
    console.log("iOS haptic failed", e);
  }
};

const useHaptic = () => {
  const trigger = (type = "medium") => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      iosVibrate();
    } else {
      if (navigator.vibrate) {
        const patterns = {
          light: [30],
          medium: [60],
          heavy: [100],
        };

        navigator.vibrate(patterns[type] || [60]);
      }
    }
  };

  return { trigger };
};

export default useHaptic;