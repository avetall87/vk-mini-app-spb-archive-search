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

import logo from '../img/medal_32_32.png';
import priznanie from '../img/narodnoe-priznanie-logotip_150.png';
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";


const Home = ({id, go, vkGroupId}) => {

    const [getHumanName, setHumanName] = useState('');
    const SUPPORT_PROJECT_URL = "http://2020.prof-it.d-russia.ru/medal-za-oborony-leningrada";

    useEffect(() => {

    }, []);

    const supportProject = async () => {
        window.open(SUPPORT_PROJECT_URL);
    }

    const search = async () => {
        window.open(`https://medal.spbarchives.ru/search?query=${getHumanName}&advancedSearch=false&from=vk`);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.open(`https://medal.spbarchives.ru/search?query=${getHumanName}&advancedSearch=false&from=vk`);
        }
    }

    const onLabelChange = (event) => {
        setHumanName(event.target.value);
    };

    return (<Panel id={id}>
            <PanelHeader right={vkGroupId && <Button
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
                <Div style={{paddingTop: 0}}>
                    <h3 align="left" style={{paddingLeft: 16, fontWeight: 500}}>Поиск награжденных медалью</h3>
                    <Search
                        placeholder="ФИО, год рождения, место работы"
                        id="medalSearchId" type="text" value={getHumanName} onChange={onLabelChange} onKeyDown={_handleKeyDown}/>
                    <Div>
                        <Button size="l" className="SearchButton"
                                title="Искать на сайте: Медаль «За оборону Ленинграда»" onClick={search}>
                            Искать
                        </Button>
                    </Div>
                    <Div style={{paddingTop: 10, color: 'gray'}}>
                        В базу внесены данные на <b>167&nbsp;785</b> персоналий. Работа продолжается
                    </Div>

                    <br/>
                    <br/>

                    <Div style={{paddingTop: 45, vAlign: 'top'}}>
                        <span>Вы можете <a onClick={supportProject} className="Link">поддержать проект</a> в конкурсе «Народное признание».<br/></span>
                        <img src={priznanie} className="PriznanieLogo" onClick={supportProject}/>
                    </Div>
                </Div>
            </Group>
        </Panel>
    )
};

export default Home;
