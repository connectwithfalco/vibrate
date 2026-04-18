const useHaptic = () => {

  const trigger = (type = 'medium', delayMs = 0) => {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;
    // navigator.vibrate does NOT need user gesture — setTimeout is perfectly fine
    const durations = { light: 30, medium: 60, heavy: 100 };
    const duration = durations[type] || 60;

    if (delayMs > 0) {
      setTimeout(() => navigator.vibrate([duration]), delayMs);
    } else {
      navigator.vibrate([duration]);
    }
  };

  const triggerSequence = (steps = [], delayMs = 0) => {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;
    // steps = [{ duration, gap }, ...]
    // Build flat pattern: [buzz, pause, buzz, pause, ...]
    const flat = [];
    steps.forEach((step, i) => {
      flat.push(step.duration);
      if (i < steps.length - 1) flat.push(step.gap ?? 200);
    });

    setTimeout(() => navigator.vibrate(flat), delayMs);
  };

  return { trigger, triggerSequence };
};

export default useHaptic;