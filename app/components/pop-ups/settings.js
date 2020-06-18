import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PopUpsSettingsComponent extends Component {
  @service settings;

  get fontSizes() {
    return this.settings.fontSizes;
  }

  get themes() {
    return this.settings.themes;
  }

  get graphRankers() {
    return this.settings.graphRankers;
  }

  get graphDirections() {
    return this.settings.graphDirections;
  }

  get fontSize() {
    return this.settings.fontSize;
  }

  get theme() {
    return this.settings.theme;
  }

  get graphRanker() {
    return this.settings.graphRanker;
  }

  get graphDirection() {
    return this.settings.graphDirection;
  }

  get vertexSeparation() {
    return this.settings.vertexSeparation;
  }

  set vertexSeparation(value) {
    this.settings.setVertexSeparation(value);
  }

  get edgeSeparation() {
    return this.settings.edgeSeparation;
  }

  set edgeSeparation(value) {
    this.settings.setEdgeSeparation(value);
  }

  get rankSeparation() {
    return this.settings.rankSeparation;
  }

  set rankSeparation(value) {
    this.settings.setRankSeparation(value);
  }

  get minVertexSeparation() {
    return this.settings.minVertexSeparation;
  }

  get minEdgeSeparation() {
    return this.settings.minEdgeSeparation;
  }

  get minRankSeparation() {
    return this.settings.minRankSeparation;
  }

  get maxVertexSeparation() {
    return this.settings.maxVertexSeparation;
  }

  get maxEdgeSeparation() {
    return this.settings.maxEdgeSeparation;
  }

  get maxRankSeparation() {
    return this.settings.maxRankSeparation;
  }

  get displayHints() {
    return this.settings.displayHints;
  }

  set displayHints(value) {
    this.settings.setDisplayHints(value);
  }

  @action
  hideSideBar() {
    this.hideSideBarCallback();
  }

  @action
  selectTheme(selected) {
    this.settings.setTheme(selected);
  }

  @action
  selectFontSize(selected) {
    this.settings.setFontSize(selected);
  }

  @action
  selectGraphRanker(selected) {
    this.settings.setGraphRanker(selected);
  }

  @action
  selectGraphDirection(selected) {
    this.settings.setGraphDirection(selected);
  }

  @action
  resetEditorSettings() {
    this.settings.resetEditorSettings();
  }

  @action
  resetVisualizerSettings() {
    this.settings.resetVisualizerSettings();
  }
}
