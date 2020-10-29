import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import bridge from "@vkontakte/vk-bridge";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Input from "@vkontakte/vkui/dist/components/Input/Input";


const Home = ({id, go, fetchedUser}) => {

    const [getName, setName] = useState('');
    const [getSwapiId, setSwapiId] = useState(1);

    useEffect(() => {
        setName('');
    }, []);

    const swapi = async () => {
        let response = await fetch(`https://swapi.dev/api/people/${getSwapiId}/`);
        let text = await response.json();
        setName(text.name);
    }

    const reset = () => {
        setName('');
        setSwapiId(1);
    }

    const onLabelChange = (event) => {
        setSwapiId(event.target.value);
    };

    return (<Panel id={id}>
            <PanelHeader>Пример</PanelHeader>
            {fetchedUser &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}

            <Group title="Тестовые кнопки )">
                <Div>
                    <Button size="xl" level="2" onClick={go} data-to="persik">
                        Покажи мне персик, пожалуйста
                    </Button>

                    <br/>
                    <br/>
                    <h3>Найти персонажа swapi по id</h3>
                    <Input id="swapiIdInput" type="number" value={getSwapiId} onChange={onLabelChange}/>

                    <br/>
                    <br/>

                    <div style={{display: "flex", padding: "10px", margin: "10px", justifyContent: "space-between"}}>
                        <Button level="2" onClick={swapi}>
                            Найти
                        </Button>

                        <Button level="2" onClick={reset}>
                            Сбросить
                        </Button>
                    </div>

                    <br/>
                    <br/>

                    <Text style={{display: "flex", justifyContent: "center"}}>Его имя: {getName}</Text>

                </Div>
            </Group>
        </Panel>
    )
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
