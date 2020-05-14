import Service from '@ember/service';
import ENV from 'model-editor/config/environment';

const fantomGoalIDs = ENV.APP.fantomGoalIDs;

export default class TrackerService extends Service {
  trackGoal(id) {
    if (window.fathom) {
      window.fathom.trackGoal(id, 0);
    }
  }

  trackToggleJson() {
    this.trackGoal(fantomGoalIDs["toggleJson"]);
  }

  trackHelp() {
    this.trackGoal(fantomGoalIDs["help"]);
  }

  trackViewModels() {
    this.trackGoal(fantomGoalIDs["viewModels"]);
  }

  trackExportImport() {
    this.trackGoal(fantomGoalIDs["exportImport"])
  }

  trackSettings() {
    this.trackGoal(fantomGoalIDs["settings"])
  }

  trackAltWalkerDocumentation() {
    this.trackGoal(fantomGoalIDs["altWalkerDocumentation"])
  }

  trackGraphWalkerDocumentation() {
    this.trackGoal(fantomGoalIDs["graphWalkerDocumentation"])
  }

  trackGitter() {
    this.trackGoal(fantomGoalIDs["gitter"]);
  }
}
