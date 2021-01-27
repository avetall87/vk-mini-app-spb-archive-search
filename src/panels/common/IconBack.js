import React from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

export default ({go, panelId}) => {
    return (
        <Icon28ChevronBack style={{cursor: 'pointer'}}
                           onClick={go}
                           data-to={panelId}/>
    );
};