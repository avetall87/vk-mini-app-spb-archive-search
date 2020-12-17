import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/Home';
import Configuration from "./panels/configuration/Configuration";
import Post from "./panels/post/Post";

import "./panels/post/Post.css"

const App = () => {

    const STORE_WIDGET_SCOPE = "app_widget";

    const [vkGroupId, setVkGroupId] = useState(-1);
    const [isCommunityAdmin, setCommunityAdmin] = useState(false);
    const [vkAppId, setVkAppId] = useState(null);
    const [activePanel, setActivePanel] = useState('home');
    const [communityToken, setCommunityToken] = useState('');
    const [widgetCommunityTokenStorageKey, setWidgetCommunityTokenStorageKey] = useState('');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [bridgeError, setBridgeError] = useState(false);
    const [bridgeErrorMessage, setBridgeErrorMessage] = useState('');
    const [personTotalCount, setPersonTotalCount] = useState(0);
    const [urlPostLink, setUrlPostLink] = useState('');
    const [urlPostTitle, setUrlPostTitle] = useState('');


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

            if (splitData && splitData.filter(value => value.includes("vk_viewer_group_role")).map(value => value.split('=')[1])[0] === 'admin') {
                setCommunityAdmin(true);
            }

            const fetchData = await splitData.filter(value => value.includes("vk_group_id")).map(value => value.split('=')[1]);
            const groupId = fetchData[0];
            setVkGroupId(groupId);

            const fetchAppId = await splitData.filter(value => value.includes("vk_app_id")).map(value => value.split('=')[1]);
            const appId = fetchAppId[0];
            setVkAppId(appId);


            // получение параметров из адресной строки в браузере после симвода #
            if (window.location.href.includes('#')) {
                const urlParamsSplitData = await window.location.href.split('#');

                if (urlParamsSplitData && urlParamsSplitData.length > 0) {
                    urlParamsSplitData[1].split('&').forEach(element => {
                        if (element.includes("active_panel")) {
                            let splitElement = element.replaceAll("active_panel=", "");
                            setActivePanel(splitElement);
                        }
                    })
                }

            }

            if (appId !== null && groupId !== null) {
                const storageKey = appId + "_" + groupId + "_" + STORE_WIDGET_SCOPE;

                setWidgetCommunityTokenStorageKey(storageKey);

                await fetchStorageData(storageKey);
            }

            try {
                let response = await fetch(`https://medal.spbarchives.ru/api/v1/person/total/count/`);
                let json = await response.json();

                if (json.hasOwnProperty('count') && json.count !== 'undefined' && json.count > 0) {
                    let formattedResult = new Intl.NumberFormat('ru-RU').format(json.count);

                    setPersonTotalCount(formattedResult);
                    console.log(formattedResult)
                }
            } catch (e) {
                console.log("Fail to fetch persons count by last_name" + e);
            }
        }

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        async function fetchStorageData(storageKey) {
            try {
                const fetchWidgetCommunityStorageToken = await bridge.send("VKWebAppStorageGet", {"keys": [`${storageKey}`]});

                if (fetchWidgetCommunityStorageToken !== null
                    && fetchWidgetCommunityStorageToken !== undefined
                    && fetchWidgetCommunityStorageToken.hasOwnProperty("keys")
                    && fetchWidgetCommunityStorageToken.keys.length > 0) {
                    if (fetchWidgetCommunityStorageToken.keys[0].key === storageKey) {
                        let token = fetchWidgetCommunityStorageToken.keys[0].value;
                        setCommunityToken(token);
                    }
                }

            } catch (e) {
                setBridgeError(true);
                setBridgeErrorMessage('Ошибка при получении данных из хранилища');
            }

        }


        async function fetchUrlParameters() {

        }

        fetchData();
        fetchLunchParameters();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    const getCommunityAccessToken = () => {
        bridge.send("VKWebAppGetCommunityToken", {"app_id": Number(vkAppId), "group_id": Number(vkGroupId), "scope": STORE_WIDGET_SCOPE}).then(result => {
            const token = result.access_token;
            bridge.send("VKWebAppStorageSet", {"key": widgetCommunityTokenStorageKey, "value": token}).then(() => {
                setCommunityToken(token);
            }).catch(e => {
                setBridgeError(true);
                setBridgeErrorMessage('Ошибка при сохранении сгенерированного токена в хранилище');
                console.log(JSON.stringify(e));
            });
        }).catch(e => {
            setBridgeError(true);
            setBridgeErrorMessage('Ошибка при получении токена доступа для сообщества');
            console.log(JSON.stringify(e));
        });
    }

    return (
        <View activePanel={activePanel} popout={popout}>

            <Post id='post'
                  go={go}
                  postTitle={urlPostTitle}
                  postLink={urlPostLink}/>

            <Home id='home'
                  fetchedUser={fetchedUser}
                  go={go}
                  vkGroupId={vkGroupId}
                  isCommunityAdmin={isCommunityAdmin}
                  personTotalCount={personTotalCount}/>

            <Configuration id='configuration' go={go}
                           vkGroupId={vkGroupId}
                           communityToken={communityToken}
                           vkAppId={vkAppId}
                           getCommunityAccessToken={getCommunityAccessToken}
                           bridgeError={bridgeError}
                           bridgeErrorMessage={bridgeErrorMessage}
                           personTotalCount={personTotalCount}/>

        </View>
    );
}

export default App;
