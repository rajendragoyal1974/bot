async function loadSettings() {
  const response = await fetch('/api/settings');
  if (!response.ok) {
    throw new Error('Unable to load settings');
  }
  return response.json();
}

loadSettings()
  .then((settings) => console.log('Dashboard settings loaded', settings))
  .catch((error) => console.error(error.message));
