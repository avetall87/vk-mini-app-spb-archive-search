import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';

import './Home.css';

import logo from '../../img/medal_32_32.png';
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import bridge from "@vkontakte/vk-bridge";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import {Icon16ErrorCircleFill} from "@vkontakte/icons";
import SearchBanner from "./searchbanner/SearchBanner";
import SearchBlock from "./searchblock/SearchBlock";
import Separator from "@vkontakte/vkui/dist/components/Separator/Separator";
import Caption from "@vkontakte/vkui/dist/components/Typography/Caption/Caption";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import axios from "axios";
import {SearchApiService} from "./SearchApiService";
import {RemoteAPI} from "../../utils/RemoteAPI";
import {UserInfoService} from "../../utils/UserInfoService";


const Home = ({id, go, userInfo, vkGroupId, isCommunityAdmin, personTotalCount}) => {

    const MAX_MOBILE_SCREEN_WIDTH = 576;

    const [personCount, setPersonCount] = useState(0);
    const [searchText, setSearchTest] = useState('');

    const [widgetError, setWidgetError] = useState(false);
    const [widgetErrorMessage, setWidgetErrorMessage] = useState(false);

    const firstName = UserInfoService.getUserFirstName(userInfo);
    const lastName = UserInfoService.getUserLastName(userInfo);

    async function fetchUserData() {
            try {
                let response = await RemoteAPI.get(`/api/v1/person/count/${lastName}/`);
                let json = await response.json();

                if (json.hasOwnProperty('count') && json.count !== 'undefined' && json.count > 0) {
                    setPersonCount(json.count);
                    console.log(json.count)
                }
            } catch (e) {
                console.log("Fail to fetch persons count by last_name" + e);
                setWidgetError(true);
                setWidgetErrorMessage("Произошла ошибка в процессе получения кол-ва однофамильцев");
            }
    }

    fetchUserData().catch(e => {
        console.log(e);
    });

    const openSearchWindow = (searchToken) => {
        RemoteAPI.openSearchWindow(searchToken);
    }

    const showFoundedRecords = async () => {
        openSearchWindow(lastName);
    }

    const search = async () => {
        openSearchWindow(searchText);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            openSearchWindow(searchText);
        }
    }

    const onLabelChange = (event) => {
        setSearchTest(event.target.value);
    };

    const isMobileDevice = () => {
        return document.body.clientWidth <= MAX_MOBILE_SCREEN_WIDTH;
    }

    const showWidgetConfiguration = () => {
        return vkGroupId && isCommunityAdmin;
    }

    return (<Panel id={id}>
            <PanelHeader right={showWidgetConfiguration() &&
            <Button
                onClick={go} data-to="configuration"
                title="Настройки виджета"
                before={<Icon28SettingsOutline/>}
                mode="tertiary">
            </Button>}>
                <PanelHeaderContent before={<Avatar size={36} src={logo}/>}>
                    <span className="PageHeaderContent"> Медаль «За оборону Ленинграда»</span>
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <Div className="MainContainer">

                    {personCount > 0 &&
                    <SearchBanner firstName={firstName}
                                  lastName={lastName}
                                  personCount={personCount}
                                  searchButton={showFoundedRecords}/>}

                    {personCount > 0 && <Separator/> }

                    <SearchBlock searchButton={search}
                                 handleKeyDown={_handleKeyDown}
                                 isMobileDevice={isMobileDevice}
                                 onLabelChange={onLabelChange}
                                 personTotalCount={personTotalCount}/>
                </Div>
            </Group>
            {widgetError &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                {widgetErrorMessage}
            </Snackbar>
            }
        </Panel>
    )
};

export default Home;
