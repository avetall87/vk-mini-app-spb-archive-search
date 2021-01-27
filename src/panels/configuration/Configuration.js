import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import bridge from '@vkontakte/vk-bridge';

import './Configuration.css';
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
import {FormItem} from "@vkontakte/vkui";
import PanelHeaderTextContent from '../common/PanelHeaderTextContent';
import IconBack from '../common/IconBack';

const Configuration = ({
                           id,
                           go,
                           vkGroupId,
                           communityToken,
                           vkAppId,
                           getCommunityAccessToken,
                           bridgeError,
                           bridgeErrorMessage,
                           personTotalCount
                       }) => {

    const APP_LINK = `https://vk.com/app${vkAppId}`;

    const [widgetError, setWidgetError] = useState(false);
    const [unsupportedPlatform, setUnsupportedPlatform] = useState(false);

    const [title, setTitle] = useState('Найди однофамильцев в архивных документах');
    const [text, setText] = useState('Медаль «За оборону Ленинграда»');
    const [descr, setDescr] = useState(`В базе данных ${personTotalCount} гражданских лиц`);

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

    const onMoreUrlChange = (event) => {
        setMoreUrl(event.target.value);
    };

    const addWidget = () => {
        try {
            let groupId = Number(vkGroupId);
            bridge.send("VKWebAppShowCommunityWidgetPreviewBox",
                {
                    "group_id": groupId, "type": "cover_list", "code": `var first_name = API.users.get({})@.first_name;

                                                                          if (first_name) { 
                                                                             first_name = first_name + ", ";
                                                                          } else {
                                                                             first_name = "Авторизуйся и ";
                                                                          }
                                                                              
                                                                        return {"title": first_name + '${title}',"title_url": '${moreUrl}',"rows": [{"title": '${text}',"descr": '${descr}',"cover_id": '7643740_899857', "url": '${moreUrl}'}]};`

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
            <PanelHeader left={<IconBack go={go} panelId="home"/>}>
                <PanelHeaderTextContent title={'Настройки'}/>
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
                    <FormItem top="Заголовок виджета, до 100 символов"
                              bottom={title ? '' : 'Пожалуйста, укажите что-то в заголовке виджета'}
                              status={title ? 'valid' : 'error'}>
                        <Input id="titleId"
                               maxLength="100"
                               value={title}
                               onChange={onTitleChange}/>
                    </FormItem>

                    <FormItem top="Текст для отображения в виджете, до 200 символов"
                              bottom={text ? '' : 'Пожалуйста, заполните текст в виджите'}
                              status={text ? 'valid' : 'error'}>
                        <Textarea id="textId"
                                  maxLength="200"
                                  value={text}
                                  onChange={onTextChange}/>
                    </FormItem>

                    <FormItem top="Описание для отображения в виджете, до 200 символов"
                              bottom={descr ? '' : 'Пожалуйста, заполните описание'}
                              status={descr ? 'valid' : 'error'}>
                        <Textarea id="descrId"
                                  maxLength="200"
                                  value={descr}
                                  onChange={onDescrChange}/>
                    </FormItem>

                    <FormItem top="URL для футера. Обязателен, если указан текст в футере"
                              bottom={moreUrl ? '' : 'Ссылка на приложение должно быть обязательна'}
                              status={moreUrl ? 'valid' : 'error'}>
                        <Input id="moreUrlId"
                               maxLength="10000"
                               value={moreUrl}
                               onChange={onMoreUrlChange}
                               disabled/>
                    </FormItem>

                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button mode="primary" size="l" className="SearchButton" title="Опубликовать виджет"
                                onClick={addWidget} before={<Icon24ListAdd/>}>Опубликовать виджет</Button>
                    </Div>
                </FormLayout>}
                {activeTab === 'appConfig' &&
                <FormLayout>
                    <FormItem top="Идентификатор приложения">
                        <Input id="appId"
                               value={vkAppId}/>
                    </FormItem>

                    <FormItem top="Идентификатор группы">
                        <Input id="groupId"
                               value={vkGroupId}/>
                    </FormItem>

                    <FormItem top="Токен доступа - для обновления виджета">
                        <Input id="tokenId"
                               value={communityToken}/>
                    </FormItem>

                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button mode="primary"
                                size="l"
                                className="SearchButton"
                                title="Получить и сохранить токен доступа в хранилище"
                                onClick={getCommunityAccessToken}
                                before={<Icon24Linked/>}>Получить и сохранить токен доступа в хранилище</Button>
                    </Div>
                </FormLayout>}
            </Group>

            {widgetError &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff'
                                                                                                            width={16}
                                                                                                            height={16}/></Avatar>}
                duration={10000}>
                Произошла ошибка при добавлении виджета !
            </Snackbar>
            }

            {unsupportedPlatform &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16InfoCirle fill='#fff'
                                                                                                      width={16}
                                                                                                      height={16}/></Avatar>}
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
