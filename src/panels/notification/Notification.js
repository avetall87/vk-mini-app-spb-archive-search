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
import {NotificationHelper} from './NotificationHelper'

import './Notification.css'

import BackgroundImage from './../../img/background_search_main.jpg'
import {Spinner} from "@vkontakte/vkui";
import _ from "lodash";

const Notification = ({id, go, userInfo, searchQuery}) => {

    const [error, setError] = useState(null);
    const [notificationIsAdded, setNotificationIsAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    const firstName = UserInfoService.getUserFirstName(userInfo);
    const vkUserId = UserInfoService.getUserId(userInfo);

    const doNotification = () => {
        bridge.send("VKWebAppAllowNotifications")
            .then(() => {
                setLoading(true);
                NotificationApiService.subscribeToNotification(vkUserId, searchQuery)
                    .then(response => {
                            // вызов модального окна или snackbar
                            if (!response.ok) {
                                setError("Ошибка в процессе подписки на уведомление!");
                            } else {
                                setNotificationIsAdded(true);
                                console.log(response);
                            }

                            setLoading(null);
                        }
                    )
                    .catch(e => {
                        setError("Ошибка в процессе подписки на уведомление: " + e);
                        console.log(e);
                        setLoading(null);
                    });

            })
            .catch(e => {
                console.log(e);
                if (e.error_data.error_code !== 4) {
                    setError('Ошибка в процессе получения согласия на уведомления!');
                    console.log(e);
                }
                setLoading(null);
            });
    }

    const getDescriptionForSearchQuery = (query) => {
        let result = '';

        const parsedQuery = JSON.parse(query);
        const delimiter = '; ';

        _.forEach(_.keys(parsedQuery), (key) => {
            const value = decodeURIComponent(NotificationHelper.getNullValue(_.get(parsedQuery, key, '')));

            if (value !== '') {
                const labelName = NotificationHelper.mapSearchKeyToHumanName(key);

                if (labelName !== '-') {
                    if (labelName !== '') {
                        result += labelName + ': ' + value + delimiter;
                    } else {
                        result += value + delimiter;
                    }
                }
            }
        });

        if (result !== '') {
            if (result.endsWith(delimiter)) {
                result = result.substr(0,result.lastIndexOf(delimiter));
            }
            result = '«' + result + '».';
        }

        return result;
    }


    const notificationContent = () => {
        if (!notificationIsAdded) {

            return (
                <Div className="pt-0 mt-4">
                    <Div className="NotificationDescription pb-0">
                        <Div className="pt-0 pb-0">
                            <span className="semibold">{firstName}</span>, Вы можете подписаться на уведомления по вашему запросу:
                        </Div>
                        <Div className="pt-0 mt-2 pb-0">
                            <span className="semibold">{searchQuery && getDescriptionForSearchQuery(searchQuery)}</span>
                        </Div>
                        <Div className="pt-0 mt-4 pb-0">
                            Вам придет оповещение, как только появятся новые данные.
                        </Div>
                    </Div>

                    <Div className=" pt-0 mt-46 d-flex justify-content-center">
                        <Button size="l" onClick={doNotification}>Уведомить о новых записях</Button>
                    </Div>
                </Div>
            );
        } else {
            return (
                <Div className="pt-4 pb-0 d-flex justify-content-center">
                    <Div className="p-0 m-0"> <Icon28CheckCircleFill fill='#fff' width={40} height={40}/> </Div>
                    <Div className="pl-3 pt-2 m-0"> <span className="p-0 semibold">{firstName}</span>, Вы успешно подписаны на уведомления! </Div>
                </Div>
            );
        }
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<Icon28ChevronBack className="chevron-back"
                                                  onClick={go}
                                                  data-to="home"/>}>
                Уведомления
            </PanelHeader>
            <Group>
                <FormLayout>
                    <img className="w-100 p-0 m-0" src={BackgroundImage} alt="Logo"/>
                    {loading ? <Spinner size="large" className="spinner-loading"/> : notificationContent()}
                </FormLayout>
            </Group>

            {error &&
            <Snackbar
                layout='vertical'
                onClose={() => setError(null)}
                before={<Avatar size={16} className="error-snake-bar-color"><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                {error}
            </Snackbar>
            }

        </Panel>
    );
}

export default Notification;
