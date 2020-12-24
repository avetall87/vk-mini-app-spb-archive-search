import React, {useEffect, useState} from 'react';
import bridge from "@vkontakte/vk-bridge";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16ErrorCircleFill} from "@vkontakte/icons";
import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Link from "@vkontakte/vkui/dist/components/Link/Link";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import {FormItem} from "@vkontakte/vkui";
import MixedTags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"

const tagifySettings = {
  mode: "mix"
}

const Post = ({id, go, personLink, snippetTitle, snippetImageLink}) => {

    const [postMessage, setPostMessage] = useState('#medalspb');
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [bridgePostError, setBridgePostError] = useState(false);

    useEffect(() => {
        setLink(personLink);
        setTitle(snippetTitle);
        setImageLink(snippetImageLink);
    })

    const doPost = () => {
        bridge.send("VKWebAppShowWallPostBox", {
            "attachments": [
                link
            ],
            "message": `${postMessage}`
        }).then(response => console.log(JSON.stringify(response)))
            .catch(e => {
                console.log("Ошибка: " + JSON.stringify(e));
                if (e.error_data.error_code !== 4) {
                    setBridgePostError(true);
                    console.log(e);
                }
            });
    }

    const handlePostMessage = (event) => {
      setPostMessage(event.detail.textContent);
    }

    return (<Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>
            <PanelHeaderContent>
                <span class="PageHeaderContent">Рассказ о герое</span>
            </PanelHeaderContent>
        </PanelHeader>
        <Group>
            <FormLayout>

              <FormItem top="Запись будет доступна" style={{display: 'none'}}>
                <Radio name="radio" value="1" defaultChecked>Друзья и подписчики</Radio>
                <Radio name="radio" value="2">Отправить личным сообщением</Radio>
              </FormItem>

              <FormItem>
                <MixedTags
                    settings={tagifySettings}
                    onInput={handlePostMessage}
                    value={`&#10;&#10;&#10;
[[{"value":"#medalspb", "readonly":true}]]
        `}
                />
              </FormItem>

              <Link href={link} target="_blank"><Banner
                    before={<Avatar size={90} mode="image" src={imageLink} />}
                    header={title}
                    subheader="medal.spbarchives.ru"/>
              </Link>

              <div className="buttonWrapper">
                <Button size="l" onClick={doPost}>Опубликовать в VK</Button>
              </div>

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
