import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
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

        // function fetchAccessTokenForCommunity() {
        //     bridge.send("VKWebAppGetCommunityToken", {"app_id": Number(7643740), "group_id": Number(199830693), "scope": "app_widget"})
        //         .then(response => {
        //             console.log(`response - ${JSON.stringify(response)}`);
        //             setCommunityToken(response.hasOwnProperty("data").hasOwnProperty("access_token"));
        //             alert(0);
        //         })
        //         // TODO: добавить обработку ошибок ...
        //         .catch(e=> {
        //             alert(JSON.stringify(e));
        //             console.log(e);
        //         });
        // }

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
        // fetchAccessTokenForCommunity();

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
