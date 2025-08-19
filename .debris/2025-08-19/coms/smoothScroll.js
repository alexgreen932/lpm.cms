export default function smoothScroll() {
  console.log('smoothScroll');
  document.querySelectorAll('.dot-menu a').forEach(e => {
    const url = e.getAttribute('href');
    e.addEventListener('click', () => {
        if (url) { // Check if the element exists
            url.scrollIntoView({ behavior: 'smooth' });
        }
    });
  });
}
