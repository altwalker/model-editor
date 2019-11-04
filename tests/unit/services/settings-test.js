import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | settings', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:settings');
    assert.ok(service);
  });

  test('it should call a handler', async function(assert) {
    let service = this.owner.lookup('service:settings');
    service.set("called", false);

    service.set("onChange", function() {
      this.set("called", true);
      assert.ok(service.get("called"));
    });

    service.callHandler("onChange");
  });

  test('it should call a handler with arguments', async function(assert) {
    let service = this.owner.lookup('service:settings');
    service.set("argument", null);

    service.set("onChange", function(value) {
      this.set("argument", value);
      assert.equal(service.get("argument"), value);
    });

    service.callHandler("onChange", "newValue");
  });
});

module('Unit | Service | settings | theme', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default theme if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const theme = service.getTheme();

    assert.equal(service.get("defaultTheme"), theme);
  });

  test('it should load the theme form localStorage', function(assert) {
    const theme = "seti";
    window.localStorage.setItem("editorTheme", theme);

    let service = this.owner.lookup('service:settings');

    assert.equal(service.getTheme(), theme);
  });

  test('it should set the theme', function(assert) {
    let service = this.owner.lookup('service:settings');
    const theme = "seti";

    service.setTheme(theme);

    assert.equal(service.get("theme"), theme);
  });

  test('it should save the theme in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');
    const theme = "seti";

    service.setTheme(theme);

    assert.equal(localStorage.getItem("editorTheme"), theme);
  });

  test('it should call onThemeChange', function(assert) {
    let service = this.owner.lookup('service:settings');
    const theme = "seti";

    service.setOnThemeChange(function(newTheme) {
      assert.equal(newTheme, theme);
    });

    service.setTheme(theme);
  });
});

module('Unit | Service | settings | fontSize', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default fontSize if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const fontSize = service.getFontSize();

    assert.equal(service.get("defaultFontSize"), fontSize);
  });

  test('it should load the fontSize form localStorage', function(assert) {
    const fontSize = "1.25rem";
    window.localStorage.setItem("editorFontSize", fontSize);

    let service = this.owner.lookup('service:settings');

    assert.equal(service.getFontSize(), fontSize);
  });

  test('it should set the fontSize', function(assert) {
    let service = this.owner.lookup('service:settings');
    const fontSize = "1.25rem";

    service.setFontSize(fontSize);

    assert.equal(service.get("fontSize"), fontSize);
  });

  test('it should save the fontSize in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');
    const fontSize = "1.25rem";

    service.setFontSize(fontSize);

    assert.equal(localStorage.getItem("editorFontSize"), fontSize);
  });

  test('it should call onFontSizeChange', function(assert) {
    let service = this.owner.lookup('service:settings');
    const fontSize = "1.25rem";

    service.setOnFontSizeChange(function(newFontSize) {
      assert.equal(newFontSize, fontSize);
    });

    service.setFontSize(fontSize);
  });
});

module('Unit | Service | settings | graphDirection', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default graphDirection if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const graphDirection = service.getGraphDirection();

    assert.equal(service.get("defaultGraphDirection"), graphDirection);
  });

  test('it should load the graphDirection form localStorage', function(assert) {
    const graphDirection = "Left-Right";
    window.localStorage.setItem("graphDirection", graphDirection);

    let service = this.owner.lookup('service:settings');

    assert.equal(service.getGraphDirection(), graphDirection);
  });

  test('it should set the graphDirection', function(assert) {
    let service = this.owner.lookup('service:settings');
    const graphDirection = "Left-Right";

    service.setGraphDirection(graphDirection);

    assert.equal(service.get("graphDirection"), graphDirection);
  });

  test('it should save the graphDirection in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');
    const graphDirection = "Left-Right";

    service.setGraphDirection(graphDirection);

    assert.equal(localStorage.getItem("graphDirection"), graphDirection);
  });

  test('it should call onGraphLayoutOptionsChange', function(assert) {
    let service = this.owner.lookup('service:settings');
    const graphDirection = "Left-Right";

    service.setOnGraphLayoutOptionsChange(function(graphLayoutOptions) {
      assert.equal(graphLayoutOptions["graphDirection"], service.convertGraphDirection(graphDirection));
    });

    service.setGraphDirection(graphDirection);
  });

  test('it should map graphDirections correctly', function(assert) {
    let service = this.owner.lookup('service:settings');

    const graphDirections = service.get("graphDirections");
    const graphDirectionsMap = service.get("graphDirectionsMap");

    graphDirections.forEach(function(direction) {
      assert.equal(service.convertGraphDirection(direction), graphDirectionsMap[direction]);
    });
  });
});

module('Unit | Service | settings | vertexSeparation', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default vertexSeparation if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const vertexSeparation = service.getVertexSeparation();

    assert.equal(service.get("defaultVertexSeparation"), vertexSeparation);
  });

  test('it should load the vertexSeparation form localStorage', function(assert) {
    const vertexSeparation = 100;
    window.localStorage.setItem("vertexSeparation", vertexSeparation);

    let service = this.owner.lookup('service:settings');

    assert.equal(service.getVertexSeparation(), vertexSeparation);
  });

  test('it should set the vertexSeparation', function(assert) {
    let service = this.owner.lookup('service:settings');
    const vertexSeparation = 100;

    service.setVertexSeparation(vertexSeparation);

    assert.equal(service.get("vertexSeparation"), vertexSeparation);
  });

  test('it should save the vertexSeparation in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');
    const vertexSeparation = 100;

    service.setVertexSeparation(vertexSeparation);

    assert.equal(localStorage.getItem("vertexSeparation"), vertexSeparation);
  });

  test('it should call onGraphLayoutOptionsChange', function(assert) {
    let service = this.owner.lookup('service:settings');
    const vertexSeparation = 100;

    service.setOnGraphLayoutOptionsChange(function(graphLayoutOptions) {
      assert.equal(graphLayoutOptions["vertexSeparation"], vertexSeparation);
    });

    service.setVertexSeparation(vertexSeparation);
  });
});

module('Unit | Service | settings | edgeSeparation', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default edgeSeparation if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const edgeSeparation = service.getEdgeSeparation();

    assert.equal(service.get("defaultEdgeSeparation"), edgeSeparation);
  });

  test('it should load the edgeSeparation form localStorage', function(assert) {
    const edgeSeparation = 100;
    window.localStorage.setItem("edgeSeparation", edgeSeparation);

    let service = this.owner.lookup('service:settings');

    assert.equal(service.getEdgeSeparation(), edgeSeparation);
  });

  test('it should set the edgeSeparation', function(assert) {
    let service = this.owner.lookup('service:settings');
    const edgeSeparation = 100;

    service.setEdgeSeparation(edgeSeparation);

    assert.equal(service.get("edgeSeparation"), edgeSeparation);
  });

  test('it should save the edgeSeparation in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');
    const edgeSeparation = 100;

    service.setEdgeSeparation(edgeSeparation);

    assert.equal(localStorage.getItem("edgeSeparation"), edgeSeparation);
  });

  test('it should call onGraphLayoutOptionsChange', function(assert) {
    let service = this.owner.lookup('service:settings');
    const edgeSeparation = 100;

    service.setOnGraphLayoutOptionsChange(function(graphLayoutOptions) {
      assert.equal(graphLayoutOptions["edgeSeparation"], edgeSeparation);
    });

    service.setEdgeSeparation(edgeSeparation);
  });
});

module('Unit | Service | settings | rankSeparation', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default rankSeparation if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const rankSeparation = service.getRankSeparation();

    assert.equal(service.get("defaultRankSeparation"), rankSeparation);
  });

  test('it should load the rankSeparation form localStorage', function(assert) {
    const rankSeparation = 100;
    window.localStorage.setItem("rankSeparation", rankSeparation);

    let service = this.owner.lookup('service:settings');

    assert.equal(service.getRankSeparation(), rankSeparation);
  });

  test('it should set the rankSeparation', function(assert) {
    let service = this.owner.lookup('service:settings');
    const rankSeparation = 100;

    service.setRankSeparation(rankSeparation);

    assert.equal(service.get("rankSeparation"), rankSeparation);
  });

  test('it should save the rankSeparation in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');
    const rankSeparation = 100;

    service.setRankSeparation(rankSeparation);

    assert.equal(localStorage.getItem("rankSeparation"), rankSeparation);
  });

  test('it should call onGraphLayoutOptionsChange', function(assert) {
    let service = this.owner.lookup('service:settings');
    const rankSeparation = 100;

    service.setOnGraphLayoutOptionsChange(function(graphLayoutOptions) {
      assert.equal(graphLayoutOptions["rankSeparation"], rankSeparation);
    });

    service.setRankSeparation(rankSeparation);
  });
});

module('Unit | Service | settings | graphLayoutOptions', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  test('it should load the default values for graphLayout if nothing is stored in localStorage', function(assert) {
    let service = this.owner.lookup('service:settings');

    const graphLayoutOptions = service.getGraphLayoutOptions();
    const defaultGraphLayoutOptions = {
      "graphDirection": service.convertGraphDirection(service.get("defaultGraphDirection")),
      "vertexSeparation": service.get("defaultVertexSeparation"),
      "edgeSeparation": service.get("defaultEdgeSeparation"),
      "rankSeparation": service.get("defaultRankSeparation")
    }

    assert.deepEqual(graphLayoutOptions, defaultGraphLayoutOptions, `Actual: ${JSON.stringify(graphLayoutOptions, null, 2)}\nExpected: ${JSON.stringify(defaultGraphLayoutOptions, null, 2)}`);
  });

  test('it should load the graphDirection form localStorage', function(assert) {
    const graphDirection = "Left-Right";
    window.localStorage.setItem("graphDirection", graphDirection);

    let service = this.owner.lookup('service:settings');
    const graphLayoutOptions = service.getGraphLayoutOptions();

    assert.equal(graphLayoutOptions["graphDirection"], service.convertGraphDirection(graphDirection));
  });

  test('it should load the vertexSeparation form localStorage', function(assert) {

    const vertexSeparation = 250;
    window.localStorage.setItem("vertexSeparation", vertexSeparation);

    let service = this.owner.lookup('service:settings');
    const graphLayoutOptions = service.getGraphLayoutOptions();

    assert.equal(graphLayoutOptions["vertexSeparation"], vertexSeparation);
  });

  test('it should load the edgeSeparation from localStorage', function(assert) {
    const edgeSeparation = 250;
    window.localStorage.setItem("edgeSeparation", edgeSeparation);

    let service = this.owner.lookup('service:settings');
    const graphLayoutOptions = service.getGraphLayoutOptions();

    assert.equal(graphLayoutOptions["edgeSeparation"], edgeSeparation);
  });

  test('it should load the rankSeparation from localStorage', function(assert) {
    const rankSeparation = 250;
    window.localStorage.setItem("rankSeparation", rankSeparation);

    let service = this.owner.lookup('service:settings');

    const graphLayoutOptions = service.getGraphLayoutOptions();

    assert.equal(graphLayoutOptions["rankSeparation"], rankSeparation);
  });
});
