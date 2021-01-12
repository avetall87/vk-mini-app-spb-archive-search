import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import './Home.css';
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import {Icon16ErrorCircleFill} from "@vkontakte/icons";
import SearchBanner from "./searchbanner/SearchBanner";
import {RemoteAPI} from "../../utils/RemoteAPI";
import {UserInfoService} from "../../utils/UserInfoService";

import BackgroundImage from './../../img/background_search_main.jpg'

import MedalImage from '../../img/Medal_vk(2x).png'
import SearchBlock from "./searchblock/SearchBlock";
import classNames from 'classnames';


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

    const showFoundedRecords = () => {
        openSearchWindow(lastName);
    }

    const search = () => {
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
                    <span className="PageHeaderContent"> Медаль «За оборону Ленинграда»</span>
            </PanelHeader>
            <Group>
                <Div className="m-0 p-0 search-container h-100">
                    <Div className="m-0 p-0" style={{zIndex: 1}}>
                        <img className="w-100 p-0 m-0" src={BackgroundImage} alt="Logo"/>
                    </Div>
                    <Div className="m-0 p-0" style={{zIndex: 2, position: "relative", bottom: "65px", backgroundColor: "white", width: "82%", borderRadius: "4px"}}>
                        <SearchBlock searchButton={search}
                                     handleKeyDown={_handleKeyDown}
                                     isMobileDevice={isMobileDevice}
                                     onLabelChange={onLabelChange}
                                     personTotalCount={personTotalCount}/>
                    </Div>

                </Div>

                <Div className="MainContainer d-flex justify-content-between px-38">
                    {document.body.clientWidth >= MAX_MOBILE_SCREEN_WIDTH &&
                    <Div className="col-md-3 pl-0 pr-0 ml-0 mr-0 mt-0 pt-0">
                        <Div className="pl-0 pr-0 ml-0 mr-0 mt-0 pt-0">
                            <Div className="pl-0 pr-0 ml-0 mr-0 mt-0 pt-0">
                                <img style={{width: "188px", height: "309px"}} src={MedalImage} alt="Logo"/>
                            </Div>
                        </Div>
                    </Div>
                    }

                    <Div className="col-md-9 col-sm-12 mt-0 pt-0">
                        {personCount > 0 &&
                        <SearchBanner firstName={firstName}
                                      lastName={lastName}
                                      personCount={personCount}
                                      searchButton={showFoundedRecords}/>}

                        <ul className={classNames("mt-0 ml-0 mr-0 pl-20", {"pt-112": personCount <= 0})}>
                            <li className="pb-1">Поиск архивных документов о награжденных медалью.</li>
                            <li>Рассказ истории о награжденном герое.</li>
                            <li className="pt-1">Подписка на уведомление о появлении новых данных.</li>
                        </ul>
                    </Div>
                </Div>
            </Group>
            {widgetError &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} className="error-snake-bar-color"><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                {widgetErrorMessage}
            </Snackbar>
            }
        </Panel>
    )
};

export default Home;
