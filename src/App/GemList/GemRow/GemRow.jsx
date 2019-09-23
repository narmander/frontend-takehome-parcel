import React from 'react';
import styled from 'styled-components'
import { saveGem, removeGem } from '../../../utils';

const GemRowStyles = styled.li``;

const GemRow = props => {
  const { name, version, info, downloads, project_uri, saved } = props;

  const updateGems = savingGem => {
    if (savingGem) {
      saveGem(props);
    } else {
      removeGem(name);
    }
  };

  return (
    <li className="gem-row">
      <span>
        <h3 className="name">
          {name}
          <span className="version">{version}</span>
        </h3>
        <p className="description">{info}</p>
      </span>
      <span className="ruby-heart">
        <label>
          Save or Remove this Gem
          <input
            className="gem-save-toggle"
            name="gem-save"
            type="checkbox"
            checked={saved}
            onChange={e => updateGems(e.target.checked)}
          />
        </label>
      </span>
      <span className="gem-details">
        <p className="download-count">Downloads: {downloads}</p>
        <p className="last-updated">Last updated: 2011-08-08</p>
        <a href={project_uri}>More info</a>
      </span>
    </li>
  );
};

export default GemRow;
