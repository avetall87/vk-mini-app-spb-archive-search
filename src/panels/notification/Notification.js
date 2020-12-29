import React, {useState} from 'react';
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import bridge from "@vkontakte/vk-bridge";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16ErrorCircleFill, Icon28CheckCircleFill} from "@vkontakte/icons";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {NotificationApiService} from './NotificationApiService';
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import {UserInfoService} from "../../utils/UserInfoService";

import './Notification.css'

import BackgroundImage from './../../img/background_search_main.jpg'

const Notification = ({id, go, userInfo, searchQuery}) => {

    const [error, setError] = useState(null);
    const [notificationIsAdded, setNotificationIsAdded] = useState(false);

    const firstName = UserInfoService.getUserFirstName(userInfo);
    const vkUserId = UserInfoService.getUserId(userInfo);

    const doNotification = () => {
        bridge.send("VKWebAppAllowNotifications")
            .then(() => {
                NotificationApiService.subscribeToNotification(vkUserId, searchQuery)
                    .then(response => {
                            // вызов модального окна или snackbar
                            if (!response.ok) {
                                setError("Ошибка в процессе подписки на уведомление!");
                            } else {
                                setNotificationIsAdded(true);
                                console.log(response);
                            }
                        }
                    )
                    .catch(e => {
                        setError("Ошибка в процессе подписки на уведомление: " + e);
                        console.log(e);
                    });

            })
            .catch(e => {
                console.log(e);
                if (e.error_data.error_code !== 4) {
                    setError('Ошибка в процессе получения согласия на уведомления!');
                    console.log(e);
                }
            });
    }

    const notificationContent = () => {
        if (!notificationIsAdded) {
            return <Div className="pt-0 mt-4">
                <Div className="notification-description">
                    <Div className="pt-0 pb-0">
                        <span className="semibold">{firstName}</span>, Вы можете подписаться на уведомления!
                    </Div>
                    <Div className="pt-0 mt-3 pb-0">
                        Вам придет оповещение, как только <span className="semibold">по Вашему запросу</span> появятся новые данные.
                    </Div>
                </Div>

                <Div className=" pt-0 mt-4 d-flex justify-content-center">
                    <Button size="l" onClick={doNotification}>Уведомить о новых записях</Button>
                </Div>
            </Div>;
        } else {
            return <Div className="pt-4 pb-0 d-flex justify-content-center">
                <Div className="p-0 m-0"> <Icon28CheckCircleFill fill='#fff' width={40} height={40}/> </Div>
                <Div className="pl-3 pt-2 m-0"> <span className="p-0 semibold">{firstName}</span>, Вы успешно подписаны на уведомления! </Div>
            </Div>
        }
    }

    return (
        <Panel id={id}>
            <PanelHeader style={{textAlign: "center"}}
                         left={<Icon28ChevronBack style={{cursor: "pointer"}}
                                                  onClick={go}
                                                  data-to="home"/>}>
                    <span className="PageHeaderContent">Уведомления</span>
            </PanelHeader>

            <Group>
                <FormLayout>
                    <img className="photo p-0 m-0" src={BackgroundImage} alt="Logo"/>
                    {/*{<ScreenSpinner size='large'/>}*/}
                    {notificationContent()}
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

        </Panel>
    );
}

export default Notification;
