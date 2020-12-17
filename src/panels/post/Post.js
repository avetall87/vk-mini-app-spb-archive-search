import React, {useEffect, useState} from 'react';
import bridge from "@vkontakte/vk-bridge";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16ErrorCircleFill} from "@vkontakte/icons";

const Post = ({id, go, postTitle, postLink}) => {

    const [link, setLink] = useState(postLink);
    const [title, setTitle] = useState(postTitle);
    const [bridgePostError, setBridgePostError] = useState(false);


    useEffect(() => {
        // получение параметров из адресной строки в браузере после симвода #
        if (window.location.href.includes('#')) {
            const urlParamsSplitData = window.location.href.split('#');

            if (urlParamsSplitData && urlParamsSplitData.length > 0) {
                urlParamsSplitData[1].split('&').forEach(element => {

                    if (element.includes("post_title")) {
                        let splitElement = element.replaceAll("post_title=", "");
                        setTitle(decodeURI(splitElement));
                    }

                    if (element.includes("post_link")) {
                        let splitElement = element.replaceAll("post_link=", "");
                        setLink(splitElement);
                    }
                })
            }

        }
    })

    const doPost = () => {
        bridge.send("VKWebAppShowWallPostBox", {
            "attachments": [
                link
            ],
            "message": `${title}`
        }).then(response => console.log(JSON.stringify(response)))
            .catch(e => {
                console.log("Ошибка: " + JSON.stringify(e));
                if (e.error_data.error_code !== 4) {
                    setBridgePostError(true);
                    console.log(e);
                }
            });
    }

    const getPermissionForNotification = () => {
        bridge.send("VKWebAppAllowNotifications").then(response => console.log(JSON.stringify(response))).catch(e => console.log(JSON.stringify(e)));
    }

    const removeNotificationPermission = () => {
        // .....
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleLink = (event) => {
        setLink(event.target.value)
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>
            <PanelHeaderContent>
                <span class="PageHeaderContent">Посты</span>
            </PanelHeaderContent>
        </PanelHeader>
        <Group>
            <FormLayout>
                <Textarea id="messageId"
                          top="Сообщение"
                          onChange={handleTitle}
                          value={title}/>

                <Input id="linkId"
                       top="Ссылка на внешний ресурс"
                       onChange={handleLink}
                       value={link}/>

                <Button size="xl" onClick={doPost}>Опубликовать</Button>
                <Button mode="outline" size="xl" onClick={getPermissionForNotification}>Получить права на уведомление</Button>
            </FormLayout>

            {bridgePostError &&
            <Snackbar
                layout='vertical'
                onClose={() => setBridgePostError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                Произошла ошибка при публикации поста !
            </Snackbar>
            }
        </Group>
    </Panel>)
}

export default Post;
