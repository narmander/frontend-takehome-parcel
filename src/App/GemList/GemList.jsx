import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card } from '../../shared-components/Card/Card';
import { wrapper } from '../styles';

const GemList = ({
  gems,
  filterText,
  updateGems,
  ...props
}) => {
  if (!gems.length) return <GemListStyled>empty style</GemListStyled>;

  return (
    <GemListStyled>
      {gems.map(({ name, info, version, downloads, project_uri, sha }) => {
        return (
          <Card
            className="gem-card"
            key={sha}
            toggled={localStorage.getItem(name)}
            title={name}
            info={info}
            version={version}
            downloads={downloads}
            href={project_uri}
            onIconClick={() =>
              updateGems({ name, info, version, downloads, project_uri, sha })
            }
          />
        );
      })}
    </GemListStyled>
  );
};

const GemListStyled = styled.ul`
  ${wrapper};
  display: flex;
  flex-wrap: wrap;
`;

GemList.propTypes = {
  gems: PropTypes.array,
};

Card.propTypes = {
  downloads: PropTypes.number,
  info: PropTypes.string,
  name: PropTypes.string,
  project_uri: PropTypes.string,
  updateGems: PropTypes.func,
  version: PropTypes.string,
};

export default GemList;
