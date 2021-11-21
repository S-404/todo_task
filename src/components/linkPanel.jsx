import React from 'react';
import StatusButton from './UI/button/statusButton';

const LinkPanel = ({ link }) => {
  return (
    <div className="link-panel">
      <a className="link-panel__ahref" href={link.TASK_LINK} target="_blank">
        {link.LINK_DESCRIPTION ? link.LINK_DESCRIPTION : 'link'}
        {link.ISMAIN ? ' [main]' : ''}
      </a>
      <div className={'link-panel__buttons-div'}>
        <StatusButton text={'edit✎'} />
        <StatusButton text={'copy📄'} />
      </div>
    </div>
  );
};

export default LinkPanel;
