import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/Home';
import Widget from "./panels/widget/Widget";

const App = () => {

    const [vkGroupId, setVkGroupId] = useState(-1);
    const [activePanel, setActivePanel] = useState('home');
    const [communityToken, setCommunityToken] = useState('');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);



    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchVkGroupId() {
            const fetchData = await window.location.href.split('&').filter(value => value.includes("vk_group_id")).map(value => value.split('=')[1]);
            console.log(fetchData[0]);
            setVkGroupId(fetchData[0]);
        }

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();
        fetchVkGroupId();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <View activePanel={activePanel} popout={popout}>
            <Home id='home' fetchedUser={fetchedUser} go={go} vkGroupId={vkGroupId}/>
            <Widget id='widget' go={go} vkGroupId={vkGroupId} communityToken={communityToken}/>
        </View>
    );
}

export default App;
