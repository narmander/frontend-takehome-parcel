import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import GemRow from './GemRow/GemRow';
import { Card } from '../../Card';
import { removeGem, saveGem } from '../../utils';
import { wrapper } from '../styles';

const savedGems = [];

const GemListStyled = styled.ul`
  ${wrapper};
  display: flex;
  flex-wrap: wrap;
`;

const GemList = ({ gems, ...props }) => {
  if (!gems.length) return <GemListStyled>empty style</GemListStyled>;

  // const gems = props.filterText
  //   ? props.gems.filter(gem => gem.name === props.filterText)
  //   : props.gems;
  // {/* <GemRow
  //             info={gem.info}
  //             downloads={gem.downloads}
  //             key={gem.sha}
  //             sha={gem.sha}
  //             name={gem.name}
  //             project_uri={gem.project_uri}
  //             version={gem.version}
  //             saved={gem.saved}
  //             updateGems={props.updateGems}
  //           /> */}
  const toggleSavedGem = name => {
    console.log(name);
    if (savedGems.includes(name)) {
      removeGem(name);
    } else {
      saveGem(name);
    }
  };
  return (
    <GemListStyled>
      {gems.map(({ name, info, version, downloads, saved, project_uri }) => {
        return (
          <Card
            title={name}
            info={info}
            version={version}
            downloads={downloads}
            href={project_uri}
            onIconClick={() => toggleSavedGem(name)}
            saved={saved}
          />
        );
      })}
    </GemListStyled>
  );
};

GemList.propTypes = {
  gems: PropTypes.array,
};

export default GemList;
