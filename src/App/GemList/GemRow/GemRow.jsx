import React from 'react';

const GemRow = props => {
  const { name, version, info, downloads, sha, project_uri, save } = props;
// updating down here so higher component doesn't know about the change.
// gives opportunity for someone to refavorite if accidentally unfavorited.
  const updateGems = save => {
    let gemCollection = JSON.parse(localStorage.gems);
    if (save) {
      gemCollection.push({
        name,
        version,
        info,
        downloads,
        sha,
        project_uri,
        save,
      });
    } else {
      gemCollection = gemCollection.filter(gem => gem.name !== name)
    };
    localStorage.setItem('gems', JSON.stringify(gemCollection));
  };

  return (
    <div className="gem-row">
      <span>
        <h2 className="name">
          {name}
          <span className="version">{version}</span>
        </h2>
        <p className="description">{info}</p>
      </span>
      <span className="ruby-heart">
        <label>
          Save or Remove this Gem
          <input
            className="gem-save-toggle"
            name="gem-save"
            type="checkbox"
            checked={save}
            onChange={e => updateGems(e.target.checked)}
          />
        </label>
      </span>
      <span className="gem-details">
        <p className="download-count">Downloads: {downloads}</p>
        <p className="last-updated">Last updated: 2011-08-08</p>
        <a href={project_uri}>More info</a>
      </span>
    </div>
  );
};

export default GemRow;
