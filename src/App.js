import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/Home';
import Configuration from "./panels/configuration/Configuration";
import Post from "./panels/post/Post";
import Notification from "./panels/notification/Notification";

import "./panels/post/Post.css"
import {UserInfoService} from "./utils/UserInfoService";

const App = () => {

    const STORE_WIDGET_SCOPE = "app_widget";

    const [vkGroupId, setVkGroupId] = useState(-1);
    const [isCommunityAdmin, setCommunityAdmin] = useState(false);
    const [vkAppId, setVkAppId] = useState(null);
    const [activePanel, setActivePanel] = useState('home');
    const [communityToken, setCommunityToken] = useState('');
    const [widgetCommunityTokenStorageKey, setWidgetCommunityTokenStorageKey] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [bridgeError, setBridgeError] = useState(false);
    const [bridgeErrorMessage, setBridgeErrorMessage] = useState('');
    const [personTotalCount, setPersonTotalCount] = useState(0);
    const [urlPersonLink, setUrlPersonLink] = useState('');
    const [urlSnippetTitle, setUrlSnippetTitle] = useState('');
    const [urlSnippetImageLink, setUrlSnippetImageLink] = useState('');
    const [notificationSearchQuery, setNotificationSearchQuery] = useState('');
    const [hashParameters, setHashParameters] = useState({});


    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        function getLocationHash() {
            return window.location.hash.replace('#','');
        }

        function getParametersFromHash(string) {
            let search = string
            return search === "" ? null : search.split("&").reduce((prev, curr) => {
                const [key, value] = curr.split("=");
                prev[decodeURIComponent(key)] = decodeURIComponent(value);
                return prev;
            }, {})
        }

        function fetchUserInfo() {
            UserInfoService.getUserInfoPromise().then(data => {
                setUserInfo(data);
                setPopout(null);
            })
            .catch(e => {
                //TODO: вывод snake bar с ощибкой !
                console.log("Ошибка при получении данных о пользователе");
                console.log(JSON.stringify(e));
            });
        }

        async function fetchLaunchParameters() {
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

            let locationHash = getLocationHash();
            let hashParameters = getParametersFromHash(locationHash);

            setHashParameters(hashParameters);

            if (hashParameters !== null) {
                if (hashParameters.hasOwnProperty('active_panel')) {
                    setActivePanel(hashParameters.active_panel);
                }

                if (hashParameters.hasOwnProperty('person_link')) {
                    setUrlPersonLink(hashParameters.person_link);
                }

                if (hashParameters.hasOwnProperty('snippet_title')) {
                    setUrlSnippetTitle(hashParameters.snippet_title);
                }

                if (hashParameters.hasOwnProperty('snippet_image_link')) {
                    setUrlSnippetImageLink(hashParameters.snippet_image_link);
                }

                if (hashParameters.hasOwnProperty('notify_search_query')) {
                    setNotificationSearchQuery(hashParameters.notify_search_query);
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

        fetchUserInfo();
        fetchLaunchParameters();
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

            <Notification id='notification'
                          go={go}
                          userInfo={userInfo}
                          searchQuery={notificationSearchQuery}/>

            <Post id='post'
                  go={go}
                  userInfo={userInfo}
                  personLink={urlPersonLink}
                  snippetTitle={urlSnippetTitle}
                  snippetImageLink={urlSnippetImageLink}/>

            <Home id='home'
                  go={go}
                  userInfo={userInfo}
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
