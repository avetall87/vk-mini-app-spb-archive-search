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


const Home = ({id, go, fetchedUser}) => {

	const [getName, setName] = useState('');
	const [getHumanName, setHumanName] = useState('');
	const SUPPORT_PROJECT_URL = "http://2020.prof-it.d-russia.ru/medal-za-oborony-leningrada";
	const IAC_URL = "https://iac.spb.ru";


	useEffect(() => {
		//setName('');
		reset();
	}, []);

	const supportProject = async () => {
		window.open(SUPPORT_PROJECT_URL);
	}

	const gotoDeveloperSite = async () => {
		window.open(IAC_URL);
	}

	const search = async () => {
		window.open(`https://medal.spbarchives.ru/search?query=${getHumanName}&advancedSearch=false&from=vk`);
	}

	const _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			window.open(`https://medal.spbarchives.ru/search?query=${getHumanName}&advancedSearch=false&from=vk`);
		}
	}

	const reset = () => {
		setName('');
		setHumanName('');
	}

	const onLabelChange = (event) => {
		setHumanName(event.target.value);
	};

	return (<Panel id={id}>
			<PanelHeader>

				<PanelHeaderContent
					// status="В базу внесены данные на 167 785 персоналий. Работа продолжается"
					before={<Avatar size={36} src={logo} />}
				>
					<span class="PageHeaderContent"> Медаль «За оборону Ленинграда»</span>
				</PanelHeaderContent>
				{/*Медаль «За оборону Ленинграда»*/}
			</PanelHeader>
			<Group>
				<Div style={{ paddingTop: 0}}>
					<h3 align="left" style={{ paddingLeft: 16, fontWeight: 500}} >Поиск награжденных медалью</h3>
					<Search
						placeholder="ФИО, год рождения, место работы"
						id="medalSearchId" type="text" value={getHumanName} onChange={onLabelChange}  onKeyDown={_handleKeyDown} />
					<Div>
						<Button size="l" title="Искать на сайте: Медаль ЗА ОБОРОНУ ЛЕНИИНГРАДА" onClick={search}>
							Искать
						</Button>

					</Div>
					<Div style={{ paddingTop: 20, color: 'gray' }}>
						В базу внесены данные на <b>167&nbsp;785</b> персоналий. Работа продолжается
					</Div>

					<Div style={{ paddingTop: 30, vAlign: 'top'}}>
						Вы можете <a onClick={supportProject} className="link">поддержать проект</a> в конкурсе «Народное признание».
						<img src={priznanie} className="priznanieLogo" onClick={supportProject}/>
					</Div>

					<Div style={{ paddingTop: 0, paddingRight: 30, color: 'gray', fontSize: 14, textAlign: 'right'}}>
						Разработано <a onClick={gotoDeveloperSite} className="link">СПБ ГУП «СПБ ИАЦ»</a>.
					</Div>

				</Div>
			</Group>
		</Panel>
	)
};

export default Home;
