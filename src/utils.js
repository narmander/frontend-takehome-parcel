export const normalizeData = data => {
  let normalizedData = [];
  if(!localStorage.length) localStorage.setItem(JSON.stringify(["gems"]))
  for (let gem in data) {
    normalizedData.push({
      [gem]: parsedGem.name,
      description: parsedGem.info,
      downloads: parsedGem.downloads,
      project_uri: parsedGem.project_uri,
      sha: parsedGem.sha,
      version: parsedGem.version,
    });
  }

  return normalizedData;
};
