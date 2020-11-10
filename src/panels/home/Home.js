import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import Search from '@vkontakte/vkui/dist/components/Search/Search';

import './Home.css';

import logo from '../../img/medal_32_32.png';
import priznanie from '../../img/narodnoe-priznanie-logotip_150.png';
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import bridge from "@vkontakte/vk-bridge";


const Home = ({id, go, vkGroupId, isCommunityAdmin}) => {

    const MAX_MOBILE_SCREEN_WIDTH = 576;

    const [getHumanName, setHumanName] = useState('');

    useEffect(() => {
        async function fetchUserData() {
            const user = await bridge.send('VKWebAppGetUserInfo');

            let lastName = '';

            if (user.last_name !== null
                && user.last_name !== undefined
                && user.last_name.length > 0) {

                lastName=user.last_name;
            }
            setHumanName(lastName);
        }

        fetchUserData();
    }, []);

    const openSearchWindow = (searchToken) => {
        window.open(`https://medal.spbarchives.ru/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }

    const search = async () => {
        openSearchWindow(getHumanName);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            openSearchWindow(getHumanName);
        }
    }

    const onLabelChange = (event) => {
        setHumanName(event.target.value);
    };

    const isMobileDevice = () => {
        return document.body.clientWidth <= MAX_MOBILE_SCREEN_WIDTH;
    }

    const getApplicationLabel = () => {
        if (isMobileDevice()) {
            return <h4 align="left" className="SearchLabel">Поиск награжденных медалью</h4>;
        } else {
            return <h3 align="left" className="SearchLabel">Поиск награжденных медалью</h3>;
        }
    }

    const getSearchField = () => {
        let placeHolder = "ФИО, год рождения";

        if (!isMobileDevice()) {
            placeHolder += ", место работы";
        }

        return <Search
            placeholder={placeHolder}
            id="medalSearchId"
            type="text"
            value={getHumanName}
            onChange={onLabelChange}
            onKeyDown={_handleKeyDown}/>;
    }

    const showWidgetConfiguration = () => {
        return vkGroupId && isCommunityAdmin;
    }

    return (<Panel id={id}>
            <PanelHeader right={showWidgetConfiguration() && <Button
                                                                    onClick={go} data-to="widget"
                                                                    title="Настройки виджета"
                                                                    before={<Icon28SettingsOutline/>}
                                                                    mode="tertiary">
                                                                    Настройки виджета
                                                             </Button>}>

                <PanelHeaderContent before={<Avatar size={36} src={logo}/>}>
                    <span class="PageHeaderContent"> Медаль «За оборону Ленинграда»</span>
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <Div className="MainContainer">
                    {getApplicationLabel()}
                    {getSearchField()}
                    <Div>
                        <Button size="l" className="SearchButton"
                                title="Искать на сайте: Медаль «За оборону Ленинграда»" onClick={search}>
                            Искать
                        </Button>
                    </Div>
                    <Div className="Description">
                        В базу внесены данные на <b>167&nbsp;939</b> персоналий. Работа продолжается
                    </Div>
                </Div>
            </Group>
        </Panel>
    )
};

export default Home;
