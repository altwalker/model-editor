import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['editMode'],
  editMode: false,
  error: null,

  title: computed("editMode", function() {
    return this.editMode ? "Graph Editor" : "Graph Visualizer";
  }),

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
