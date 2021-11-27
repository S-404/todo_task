import React from 'react';
import StatusButton from './UI/button/statusButton';

const LinkPanel = ({link, setModalLinkProp,setSelectedLinkID}) => {
    return (
        <div className="link-panel">
            <a className="link-panel__ahref" href={link.TASK_LINK} target="_blank" rel="noreferrer">
                {link.LINK_DESCRIPTION ? link.LINK_DESCRIPTION : 'link'}
                {link['ISMAIN'] ? ' [main]' : ''}
            </a>
            <div className={'link-panel__buttons-div'}>
                <StatusButton
                    text={'edit✎'}
                    onClick={()=> {
                        setSelectedLinkID(link.ID);
                        setModalLinkProp(true);
                    }}/>
                <StatusButton text={'copy📄'} onClick={() => {navigator.clipboard.writeText(link.TASK_LINK)}}/>
            </div>
        </div>
    );
};

export default LinkPanel;
