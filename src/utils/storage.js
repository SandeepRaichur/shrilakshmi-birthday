// LocalStorage manager for Shrilakshmi's website

const KEYS = {
  VISITS: 'shrilakshmi_visit_count',
  DISCOVERIES: 'shrilakshmi_discoveries',
  GARDEN_STAGE: 'shrilakshmi_garden_stage',
  SECRET_UNLOCKED: 'shrilakshmi_secret_unlocked',
  LAST_VISIT_TIME: 'shrilakshmi_last_visit',
};

// Track and return visit status
export function registerVisit() {
  try {
    const rawCount = localStorage.getItem(KEYS.VISITS);
    const count = rawCount ? parseInt(rawCount, 10) + 1 : 1;
    localStorage.setItem(KEYS.VISITS, count.toString());
    localStorage.setItem(KEYS.LAST_VISIT_TIME, new Date().toISOString());

    let message = "first time here? 👀";
    if (count === 2) {
      message = "Oh. You're back.";
    } else if (count >= 3) {
      message = "You came back again. 😂";
    }

    return { count, message };
  } catch (err) {
    return { count: 1, message: "first time here? 👀" };
  }
}

// Get discovered items list
export function getDiscoveries() {
  try {
    const raw = localStorage.getItem(KEYS.DISCOVERIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Add a discovery milestone
export function addDiscovery(discoveryId) {
  try {
    const list = getDiscoveries();
    if (!list.includes(discoveryId)) {
      list.push(discoveryId);
      localStorage.setItem(KEYS.DISCOVERIES, JSON.stringify(list));
      return { isNew: true, count: list.length, list };
    }
    return { isNew: false, count: list.length, list };
  } catch {
    return { isNew: false, count: 0, list: [] };
  }
}

// Garden stage persistence
export function getSavedGardenStage() {
  try {
    const raw = localStorage.getItem(KEYS.GARDEN_STAGE);
    return raw !== null ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveGardenStage(stage) {
  try {
    localStorage.setItem(KEYS.GARDEN_STAGE, stage.toString());
  } catch {}
}

// Secret unlock persistence
export function isSecretUnlocked() {
  try {
    return localStorage.getItem(KEYS.SECRET_UNLOCKED) === 'true';
  } catch {
    return false;
  }
}

export function saveSecretUnlocked() {
  try {
    localStorage.setItem(KEYS.SECRET_UNLOCKED, 'true');
  } catch {}
}
