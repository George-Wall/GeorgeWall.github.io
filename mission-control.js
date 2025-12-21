// Mission Control - Progress Tracking System
class MissionControlSystem {
  constructor() {
    this.missions = {
      'security-grid': { id: 1, complete: false, code: '42' },
      'decryption': { id: 2, complete: false, code: 'ALPHA' },
      'data-stream': { id: 3, complete: false, code: 'SIERRA' }
    };
    this.loadProgress();
  }

  loadProgress() {
    const saved = localStorage.getItem('missionProgress');
    if (saved) {
      const savedMissions = JSON.parse(saved);
      Object.keys(savedMissions).forEach(key => {
        if (this.missions[key]) {
          this.missions[key].complete = savedMissions[key].complete;
        }
      });
    }
  }

  saveProgress() {
    localStorage.setItem('missionProgress', JSON.stringify(this.missions));
  }

  completeMission(missionId, code) {
    if (this.missions[missionId]) {
      this.missions[missionId].complete = true;
      this.saveProgress();
      console.log(`✅ Mission ${missionId} completed. Code: ${code}`);
    }
  }

  isMissionComplete(missionId) {
    return this.missions[missionId]?.complete || false;
  }

  allMissionsComplete() {
    return Object.values(this.missions).every(m => m.complete);
  }

  getFinalCode() {
    return Object.values(this.missions)
      .sort((a, b) => a.id - b.id)
      .map(m => m.code)
      .join('-');
  }

  updateHub() {
    // Update mission card states
    Object.keys(this.missions).forEach((missionId, index) => {
      const mission = this.missions[missionId];
      const statusEl = document.getElementById(`status-${mission.id}`);
      const btnEl = document.getElementById(`btn-${mission.id}`);
      const codeEl = document.getElementById(`code-${mission.id}`);

      if (mission.complete) {
        statusEl.textContent = '✅ COMPLETE';
        statusEl.style.color = '#00ff00';
        if (codeEl) codeEl.style.display = 'block';
      } else {
        // Check if previous mission is complete
        const prevMission = Object.values(this.missions).find(m => m.id === mission.id - 1);
        if (!prevMission || prevMission.complete) {
          statusEl.textContent = '⏳ ACTIVE';
          statusEl.style.color = '#ffff00';
          if (btnEl) {
            btnEl.disabled = false;
            btnEl.textContent = 'DEPLOY';
          }
        }
      }
    });

    // Show final section if all complete
    if (this.allMissionsComplete()) {
      const finalSection = document.getElementById('final-section');
      const finalCodeEl = document.getElementById('final-code');
      if (finalSection && finalCodeEl) {
        finalSection.style.display = 'block';
        finalCodeEl.textContent = this.getFinalCode();
      }
    }
  }

  reset() {
    localStorage.removeItem('missionProgress');
    Object.keys(this.missions).forEach(key => {
      this.missions[key].complete = false;
    });
    console.log('🔄 Mission progress reset');
  }
}

// Global instance
const MissionControl = new MissionControlSystem();

// Console commands for testing
window.DEBUG = {
  completeMission: (id) => {
    MissionControl.completeMission(id, MissionControl.missions[id].code);
    alert(`Mission ${id} marked complete!`);
  },
  reset: () => {
    MissionControl.reset();
    alert('Progress reset! Reload page.');
  },
  showCodes: () => {
    console.log('Code Fragments:', MissionControl.getFinalCode());
  }
};

console.log('%c🎯 MISSION CONTROL ONLINE', 'color: #00ff00; font-size: 16px; font-weight: bold;');
console.log('%cDebug commands: DEBUG.completeMission("security-grid"), DEBUG.reset(), DEBUG.showCodes()', 'color: #00ff00;');
