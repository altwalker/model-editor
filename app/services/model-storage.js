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

export default class ModelStorageService extends Service {
  defaultModel = defaultModel;

  modelChangeCalbacks = {};

  loadModel() {
    return localStorage.getItem("model") || this.defaultModel;
  }

  saveModel(callerKey, model) {
    var modelString = null;

    if (typeof model == "object") {
      modelString = JSON.stringify(model, null, '\t');
    } else {
      modelString = model;
    }

    localStorage.setItem("model", modelString.trim());

    const handlers = this.modelChangeCalbacks;
    if (handlers) {
      for (let [key, handler] of Object.entries(handlers)) {
        if (callerKey !== key) {
          handler(model)
        }
      }
    }
  }

  setOnModelChange(key, handler) {
    this.modelChangeCalbacks[key] = handler;
  }

  removeOnModelChange(key) {
    delete this.modelChangeCalbacks[key];
  }
}
