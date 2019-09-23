import React from 'react';
import GemRow from './GemRow/GemRow';

const GemList = props => {
  if (!props.gems.length) return <div>empty style</div>;

  const gems = props.filterText
    ? props.gems.filter(gem => gem.name === props.filterText)
    : props.gems;

  return (
    <ul>
      {gems.map(gem => {
        return (
          <GemRow
            info={gem.info}
            downloads={gem.downloads}
            key={gem.sha}
            sha={gem.sha}
            name={gem.name}
            project_uri={gem.project_uri}
            version={gem.version}
            saved={gem.saved}
            updateGems={props.updateGems}
          />
        );
      })}
    </ul>
  );
};

export default GemList;
