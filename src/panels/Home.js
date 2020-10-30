import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Input from "@vkontakte/vkui/dist/components/Input/Input";


const Home = ({id, go, fetchedUser}) => {

    const [getName, setName] = useState('');
    const [getSearchParams, setSearchParams] = useState('');

    useEffect(() => {
        reset();
    }, []);

    const search = async () => {
        window.open(`https://medal.spbarchives.ru/search?query=${getSearchParams}&advancedSearch=false`);
    }

    const reset = () => {
        setName('');
        setSearchParams('');
    }

    const onLabelChange = (event) => {
        setSearchParams(event.target.value);
    };

    return (<Panel id={id}>
            {/*<PanelHeader>Поиск архивных документов</PanelHeader>*/}
            {fetchedUser &&
            <Group title="Ползователь">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}

            <Group>
                <Div>
                    <h2 align="center">Поиск награжденных медалью</h2>
                    <Input id="medalSearchId" type="text" value={getSearchParams} onChange={onLabelChange} placeholder="ФИО, год рождения, место работы"/>
                    {/*<br/>*/}
                    {/*<br/>*/}
                    <div style={{display: "flex", padding: "10px", margin: "10px", justifyContent: "space-between"}}>
                        <Button size="xl" title="Искать на сайте: Медаль ЗА ОБОРОНУ ЛЕНИИНГРАДА" onClick={search}>
                            Искать
                        </Button>
                    </div>
                </Div>
            </Group>
        </Panel>
    )
};

export default Home;
