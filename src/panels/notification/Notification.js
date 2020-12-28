import React, {useState} from 'react';
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import bridge from "@vkontakte/vk-bridge";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16Done, Icon16ErrorCircleFill} from "@vkontakte/icons";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {NotificationApiService} from './NotificationApiService';
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import {UserInfoService} from "../../utils/UserInfoService";

import './Notification.css'

import BackgroundImage from './../../img/background_search.jpg'

const Notification = ({id, go, userInfo, searchQuery}) => {

    const [error, setError] = useState(null);
    const [notificationIsAdded, setNotificationIsAdded] = useState(false);

    const firstName = UserInfoService.getUserFirstName(userInfo);
    const vkUserId = UserInfoService.getUserId(userInfo);

    const doNotification = () => {
        bridge.send("VKWebAppAllowNotifications")
            .then(() => {
                // call Notification API
                const service = new NotificationApiService();
                service.subscribeToNotification(vkUserId, searchQuery)
                    .then(response => {
                            // вызов модального окна или snackbar
                            if (!response.ok) {
                                setError("Ошибка в процессе подписки на уведомление!");
                            }

                            setNotificationIsAdded(true);
                            console.log(response);
                        }
                    )
                    .catch(e => {
                        setError("Ошибка в процессе подписки на уведомление: " + e);
                        console.log(e);
                    });

            })
            .catch(e => {
                if (e.error_data.error_code !== 4) {
                    setError('Ошибка в процессе получения согласия на уведомления!');
                    console.log(e);
                }
            });
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<Icon28ChevronBack style={{cursor: "pointer"}} onClick={go} data-to="home"/>}>
                <PanelHeaderContent>
                    <span className="PageHeaderContent">Уведомления</span>
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <FormLayout>
                    {/*<Div className="photo p-0 m-0" style={{backgroundImage: "url(" + BackgroundImage + ")"}}/>*/}
                    <img className="photo p-0 m-0" src={BackgroundImage} alt="Logo" />
                    <Div className="pt-0 mt-5">
                        <Div className = "notification-description">
                            <Div className="pt-0 pb-0">
                                <span className="semibold">{firstName}</span>, Вы можете подписаться на уведомления!
                            </Div>
                            <Div className="mt-3 pb-0">
                                Вам придет оповещение, как только <span className="semibold">по Вашему запросу</span> появятся новые данные.
                            </Div>
                        </Div>

                        <Div className="mt-5 d-flex justify-content-center">
                            <Button className="SearchButton" size="l" onClick={doNotification}>Уведомить о новых записях</Button>
                        </Div>
                    </Div>
                </FormLayout>
            </Group>

            {error &&
            <Snackbar
                layout='vertical'
                onClose={() => setError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                {error}
            </Snackbar>
            }

            {notificationIsAdded &&
            <Snackbar
                layout='vertical'
                onClose={() => setNotificationIsAdded(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16Done fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                Подписка на уведомление успешно завершена!
            </Snackbar>
            }

        </Panel>
    );
}

export default Notification;
