import Service from '@ember/service';

const defaultModel = `{
    "name": "Default Models",
    "models": [
        {
            "name": "DefaultModel",
            "generator": "random(never)",
            "startElementId": "v0",
            "vertices": [
                {
                    "id": "v0",
                    "name": "start_vertex"
                },
                {
                    "id": "v1",
                    "name": "state_a"
                },
                {
                    "id": "v2",
                    "name": "state_b"
                }
            ],
            "edges": [
                {
                    "id": "e0",
                    "name": "action_a",
                    "sourceVertexId": "v0",
                    "targetVertexId": "v1"
                },
                {
                    "id": "e1",
                    "name": "action_b",
                    "sourceVertexId": "v0",
                    "targetVertexId": "v2"
                }
            ]
        }
    ]
}`

export default Service.extend({
  defaultModel: defaultModel,
  onModelChange: null,

  loadModel() {
    return localStorage.getItem("model") || this.defaultModel;
  },

  saveModel(model) {
    var modelString = null;

    if (typeof model == "object") {
      modelString = JSON.stringify(model, null, '\t');
    } else {
      modelString = model;
    }

    localStorage.setItem("model", modelString.trim());

    const handler = this.get("onModelChange");
    if (handler) {
      handler(model);
    }
  },

  setOnModelChange(handler) {
    this.set("onModelChange", handler);
  },
});
