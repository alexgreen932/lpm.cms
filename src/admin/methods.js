 
// import toolbar from './toolbar.js';

export default {
  saveLocal(){this.$saveLocal(this.ops, 'state_ops')},
  openAdmin(){
    this.ops.current = 99;
    let front = document.getElementById('pade');
    front.style.display = 'none';
  },
  closeAdmin(){
    this.ops.current = null;
    let front = document.getElementById('pade');
    front.style.display = 'flex';
  },
    showSidebar(e) {//todo rm

      console.log('%c clicked show sidebar', 'color: #e50000',);
      if (this.ops.current == e) {
        this.ops.current = null;
      } else {
        this.ops.current = e;
      }
      this.isBar();
      this.isSidebar();
      
    },
    isSidebar(){
          console.log('this.ops.current: ', this.ops.current);
        let page = document.getElementById('app');
        if ( this.ops.current && this.ops.current !== 99) {
          page.classList.remove('isBar');
          page.classList.add('isSidebar');
        } else {
          page.classList.remove('isSidebar');

        }
      },
    isBar(){
          console.log('this.ops.current: ', this.ops.current);
        let page = document.getElementById('app');
        if ( this.ops.current == 99) {
          page.classList.remove('isSidebar');
          page.classList.add('isBar');
        } else {
          page.classList.add('isBar');

        }
      }
};
