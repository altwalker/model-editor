import Controller from '@ember/controller';

export default Controller.extend({
  isSideBarShown: false,

  actions: {
    showSideBar() {
      this.set("isSideBarShown", true);
    },

    hideSideBar() {
      this.set("isSideBarShown", false);
    }
  }
});
