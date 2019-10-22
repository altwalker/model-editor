import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    showSideBar() {
      document.getElementById("side-bar").style.width = "350px";
      document.getElementById("overlay").style.display = "block";
    },

    hideSideBar() {
      document.getElementById("side-bar").style.width = "0";
      document.getElementById("overlay").style.display = "none";
    }
  }
});
