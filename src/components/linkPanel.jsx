import React from 'react';
import SmallButton from './UI/button/smallButton';

const LinkPanel = ({link, setVisible, setSelectedLinkID}) => {
    return (
        <div className="link-panel">
            <a className="link-panel__ahref" href={link.TASK_LINK} target="_blank" rel="noreferrer">
                {link.LINK_DESCRIPTION ? link.LINK_DESCRIPTION : 'link'}
                {link['ISMAIN'] ? ' [main]' : ''}
            </a>
            <div className={'link-panel__buttons-div'}>
                <SmallButton
                    text={'edit✎'}
                    onClick={() => {
                        setSelectedLinkID(link.ID);
                        setVisible('linkProp',true);
                    }}/>
                <SmallButton text={'copy📄'} onClick={() => {
                    navigator.clipboard.writeText(link.TASK_LINK)
                }}/>
            </div>
        </div>
    );
};

export default LinkPanel;
