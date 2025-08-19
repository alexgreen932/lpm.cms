export default {
  mounted(el, binding) {
    let timeoutId;
    let tooltipEl;
    const extraClass = binding.arg || ''; // take value after colon (e.g. bottom-left)

    const showTooltip = () => {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'delay-tooltip' + (extraClass ? ' ' + extraClass : '');
      tooltipEl.textContent = binding.value;
      document.body.appendChild(tooltipEl);
    };

    const hideTooltip = () => {
      clearTimeout(timeoutId);
      tooltipEl?.remove();
      tooltipEl = null;
    };

    el.addEventListener('mouseenter', () => {
      timeoutId = setTimeout(showTooltip, 1000); // 1s delay
    });
    el.addEventListener('mouseleave', hideTooltip);

    el._ttCleanup = hideTooltip;
  },
  unmounted(el) {
    el._ttCleanup?.();
  }
};
