// tipDelay.js
export default {
  mounted(el, binding) {
    let timeoutId;
    let tooltipEl;

    const showTooltip = () => {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'delay-tooltip';
      tooltipEl.textContent = binding.value;
      document.body.appendChild(tooltipEl);
    };

    const hideTooltip = () => {
      clearTimeout(timeoutId);
      tooltipEl?.remove();
      tooltipEl = null;
    };

    el.addEventListener('mouseenter', () => {
      timeoutId = setTimeout(showTooltip, 1000); // delay 1s
    });
    el.addEventListener('mouseleave', hideTooltip);

    el._tipDelayCleanup = hideTooltip;
  },
  unmounted(el) {
    el._tipDelayCleanup?.();
  }
};
