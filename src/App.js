import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/Home';
import Widget from "./panels/widget/Widget";

const App = () => {

    const [vkGroupId, setVkGroupId] = useState(-1);
    const [isCommunityAdmin, setCommunityAdmin] = useState(false);
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

        async function fetchLunchParameters() {

            const splitData = await window.location.href.split('&');

            if (splitData && splitData.filter(value=> value.includes("vk_viewer_group_role")).map(value => value.split('=')[1])[0] === 'admin') {
                setCommunityAdmin(true);
            }

            const fetchData = await splitData.filter(value => value.includes("vk_group_id")).map(value => value.split('=')[1]);
            setVkGroupId(fetchData[0]);
        }

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();
        fetchLunchParameters();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <View activePanel={activePanel} popout={popout}>
            <Home id='home' fetchedUser={fetchedUser} go={go} vkGroupId={vkGroupId} isCommunityAdmin={isCommunityAdmin}/>
            <Widget id='widget' go={go} vkGroupId={vkGroupId} communityToken={communityToken}/>
        </View>
    );
}

export default App;
