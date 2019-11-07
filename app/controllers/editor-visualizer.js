import Controller from '@ember/controller';

export default Controller.extend({
  error: null,

  actions: {
    setError(error) {
      this.set("error", error)
    }
  }
});
