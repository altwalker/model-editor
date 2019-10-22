import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['editMode'],
  editMode: false,
  error: null,

  actions: {
    toggleEditMode() {
      if (!this.get("error")) {
        this.toggleProperty("editMode");
      }
    },

    setError(error) {
      this.set("error", error)
      if (error) {
        this.set("editMode", false);
      }
    }
  }
});
