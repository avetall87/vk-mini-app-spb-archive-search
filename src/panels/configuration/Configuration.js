import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import bridge from '@vkontakte/vk-bridge';

import './Configuration.css';
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Icon16ErrorCircleFill, Icon16InfoCirle, Icon24ListAdd} from "@vkontakte/icons";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Tabs from "@vkontakte/vkui/dist/components/Tabs/Tabs";
import TabsItem from "@vkontakte/vkui/dist/components/TabsItem/TabsItem";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Icon24Linked from "@vkontakte/icons/dist/24/linked";

const Configuration = ({id, go, vkGroupId, communityToken, vkAppId, getCommunityAccessToken, bridgeError, bridgeErrorMessage, personTotalCount}) => {

    const APP_LINK = "https://vk.com/app7643740";

    const [widgetError, setWidgetError] = useState(false);
    const [unsupportedPlatform, setUnsupportedPlatform] = useState(false);

    const [title, setTitle] = useState('Медаль «За оборону Ленинграда»');
    const [text, setText] = useState('Архивные документы о награжденных медалью');
    const [descr, setDescr] = useState(`В базу внесены данные на ${personTotalCount} гражданских лиц`);
    const [more, setMore] = useState('найди своих однофамильцев в архивных документах');
    const [activeTab, setActiveTab] = useState('widget');
    const [moreUrl, setMoreUrl] = useState(APP_LINK);

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onTextChange = (event) => {
        setText(event.target.value);
    };

    const onDescrChange = (event) => {
        setDescr(event.target.value);
    };

    const onMoreChange = (event) => {
        setMore(event.target.value);
    };

    const onMoreUrlChange = (event) => {
        setMoreUrl(event.target.value);
    };

    const addWidget = () => {
        try {
            let groupId = Number(vkGroupId);

            bridge.send("VKWebAppShowCommunityWidgetPreviewBox",
                {
                    "group_id": groupId, "type": "text", "code": `var first_name = API.users.get({})@.first_name;

                                                                      if (first_name) { 
                                                                         first_name = first_name + ", ";
                                                                      } else {
                                                                         first_name = "Авторизуйся и ";
                                                                      }
                                                                              
                                                                       return { title: '${title}', title_url: '${moreUrl}', text: '${text}', descr: '${descr}', more: first_name + '${more}', more_url: '${moreUrl}' };`
                })
                .then(r => console.log(r.result))
                .catch(e => {
                    if (e.error_data.error_code === 6) {
                        setUnsupportedPlatform(true);
                        return;
                    }

                    if (e.error_data.error_code !== 4) {
                        setWidgetError(true);
                        console.log(e);
                    }
                });

        } catch (e) {
            if (e.error_data.error_code === 6) {
                setUnsupportedPlatform(true);
                return;
            }

            if (e.error_data.error_code !== 4) {
                setWidgetError(true);
                console.log(e);
            }
        }
    }

    return (<Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>
                <PanelHeaderContent>
                    <span className="PageHeaderContent">Настройки</span>
                </PanelHeaderContent>
            </PanelHeader>
            <Tabs>
                <TabsItem
                    onClick={() => setActiveTab('widget')}
                    selected={activeTab === 'widget'}>
                    Настройки виджета
                </TabsItem>
                <TabsItem
                    onClick={() => setActiveTab('appConfig')}
                    selected={activeTab === 'appConfig'}>
                    Настройки приложения
                </TabsItem>
            </Tabs>

            <Group>
                {activeTab === 'widget' &&
                <FormLayout>
                    <Input id="titleId"
                           top="Заголовок виджета, до 100 символов"
                           maxLength="100"
                           value={title}
                           status={title ? 'valid' : 'error'}
                           bottom={title ? '' : 'Пожалуйста, укажите что-то в заголовке виджета'}
                           onChange={onTitleChange}/>

                    <Textarea id="textId"
                              top="Текст для отображения в виджете, до 200 символов"
                              maxLength="200"
                              value={text}
                              status={text ? 'valid' : 'error'}
                              bottom={text ? '' : 'Пожалуйста, заполните текст в виджите'}
                              onChange={onTextChange}/>

                    <Textarea id="descrId"
                              top="Описание для отображения в виджете, до 200 символов"
                              maxLength="200"
                              value={descr}
                              status={descr ? 'valid' : 'error'}
                              bottom={descr ? '' : 'Пожалуйста, заполните описание'}
                              onChange={onDescrChange}/>

                    <Input id="moreId"
                           top="Текст в футере, до 100 символов"
                           maxLength="100"
                           value={more}
                           status={more ? 'valid' : 'error'}
                           bottom={more ? '' : 'Пожалуйста, укажите наименование ссылки'}
                           onChange={onMoreChange}/>

                    <Input id="moreUrlId"
                           maxLength="10000"
                           top="URL для футера. Обязателен, если указан текст в футере"
                           value={moreUrl}
                           status={moreUrl ? 'valid' : 'error'}
                           bottom={moreUrl ? '' : 'Ссылка на приложение должно быть обязательна'}
                           onChange={onMoreUrlChange}
                           disabled/>

                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button mode="primary" size="l" className="SearchButton" title="Опубликовать виджет" onClick={addWidget} before={<Icon24ListAdd/>}>Опубликовать виджет</Button>
                    </Div>
                </FormLayout>}
                {activeTab === 'appConfig' &&
                <FormLayout>
                    <Input id="appId"
                           top="Идентификатор приложения"
                           value={vkAppId}/>

                    <Input id="groupId"
                              top="Идентификатор группы"
                              value={vkGroupId}/>

                    <Input id="tokenId"
                              top="Токен доступа - для обновления виджета"
                              value={communityToken}/>

                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button mode="primary"
                                size="l"
                                className="SearchButton"
                                title="Получить и сохранить токен доступа в хринилище"
                                onClick={getCommunityAccessToken}
                                before={<Icon24Linked/>}>Получить и сохранить токен доступа в хринилище</Button>
                    </Div>
                </FormLayout>}
            </Group>

            {widgetError &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                Произошла ошибка при добавлении виджета !
            </Snackbar>
            }

            {unsupportedPlatform &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16InfoCirle fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                Данная платформа не поддерживается
            </Snackbar>
            }

            {bridgeError &&
                <Snackbar
                    layout='vertical'
                    onClose={() => setWidgetError(null)}
                    before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                    duration={10000}>
                    {bridgeErrorMessage}
                </Snackbar>
            }

        </Panel>
    )
};

export default Configuration;
