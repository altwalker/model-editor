import Service from '@ember/service';
import { bind } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

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

  @tracked error = null;

  modelChangeCalbacks = {};

  loadModel() {
    return localStorage.getItem("model") || this.defaultModel;
  }

  saveModel(callerKey, model) {
    let modelString = null;

    if (typeof model == "object") {
      modelString = JSON.stringify(model, null, '\t').trim();
    } else {
      modelString = model.trim();
    }

    if (modelString !== localStorage.getItem("model")) {
      localStorage.setItem("model", modelString);
      this.callHandles(callerKey, model)
    }
  }

  callHandles(callerKey, model) {
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

  createStorageHandler() {
    this.storageHandler = bind(this, function(event) {
      if (event.key === "model") {
        this.callHandles("storage", localStorage.getItem("model") || this.defaultModel);
      }
    })

    window.addEventListener('storage', this.storageHandler);
  }

  destroyStorageHandler() {
    window.removeEventListener('storage', this.storageHandler)
  }

  setError(error) {
    this.error = error;
  }

  getError() {
    return this.error;
  }

  get isPlottingError() {
    return this.error && this.error.name === "PlottingError";
  }
}
