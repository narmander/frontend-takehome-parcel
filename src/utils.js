//application consts
export const COLLECTION_DATABASE = 'GEMS';

// application utility functions
export const fetchGems = searchText => {
  // add error handling
  // add loading state?
  return fetch(`${process.env.HOST_SERVER}query=${searchText}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(searchResults => searchResults);
};

export const saveGem = ({
  name,
  version,
  info,
  downloads,
  sha,
  project_uri,
  saved,
}) => {
  const gemCollection = JSON.parse(localStorage[COLLECTION_DATABASE]);
  gemCollection.push({
    name,
    version,
    info,
    downloads,
    sha,
    project_uri,
    saved,
  });
  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(gemCollection));
};

export const removeGem = gemToBeRemoved => {
  let gemCollection = JSON.parse(localStorage[COLLECTION_DATABASE]);

  gemCollection = gemCollection.filter(gem => gem.name !== gemToBeRemoved);
  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(gemCollection));
};

export const normalizeData = data => {
  let normalizedData = [];

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
