import React, {useEffect, useState} from 'react';
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import bridge from "@vkontakte/vk-bridge";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16Done, Icon16ErrorCircleFill, Icon56MoneyTransferOutline} from "@vkontakte/icons";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {NotificationApiService} from './NotificationApiService';
import Separator from "@vkontakte/vkui/dist/components/Separator/Separator";
import {PopoutWrapper} from "@vkontakte/vkui";

const Notification = ({id, go, searchQuery}) => {

    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [vkUserId, setVkUserId] = useState(null);
    const [notificationIsAdded, setNotificationIsAdded] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const user = await bridge.send('VKWebAppGetUserInfo');

            if (user.first_name !== null
                && user.first_name !== undefined
                && user.first_name.length > 0) {

                setFirstName(user.first_name);
            }

            if (user.id && user.id > 0) {
                setVkUserId(user.id);
            }
        }

        fetchUserData();
    }, []);

    const doNotification = () => {
        bridge.send("VKWebAppAllowNotifications")
            .then(() => {
                // call Notification API
                const service = new NotificationApiService();
                service.subscribeToNotification(vkUserId, searchQuery)
                    .then(response => {
                            // вызов модального окна или snackbar
                            if (!response.ok) {
                                setError("Ошибка в процессе подписки на уведопление!");
                            }

                            setNotificationIsAdded(true);
                            console.log(response);
                        }
                    )
                    .catch(e => {
                        setError("Ошибка в процессе подписки на уведопление: " + e);
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
            <PanelHeader left={<PanelHeaderBack style={{cursor: "pointer"}} onClick={go} data-to="home"/>}>
                <PanelHeaderContent>
                    <span className="PageHeaderContent">Уведомления</span>
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <FormLayout>
                    <Div>
                        <Div>
                            <span>{firstName}, Вы можете подписаться на уведомления!</span>
                            <br/>
                            <span>Вам придет уведомление как только по вашему запросу появятся новые данные.</span>
                        </Div>
                        <Separator/>
                        <Div>
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
