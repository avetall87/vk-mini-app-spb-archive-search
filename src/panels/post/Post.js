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
import {Icon16Done, Icon16ErrorCircleFill} from "@vkontakte/icons";
import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Link from "@vkontakte/vkui/dist/components/Link/Link";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import {FormItem} from "@vkontakte/vkui";
import MixedTags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"
import BridgeErrorHandler from "../../utils/BridgeErrorHandler";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import {UserInfoService} from "../../utils/UserInfoService";
import {PostApiService} from "./PostApiService";

const tagifySettings = {
  mode: "mix"
}

const Post = ({id, go, userInfo, personLink, snippetTitle, snippetImageLink}) => {

    const [postMessage, setPostMessage] = useState('#medalspb');

    const [error, setError] = useState(null);
    const [postWasPosted, setPostWasPosted] = useState(false);

    const vkUserId = UserInfoService.getUserId(userInfo);
    const link = personLink;
    const title = snippetTitle;
    const imageLink = snippetImageLink;

    const doPost = () => {
        bridge.send("VKWebAppShowWallPostBox", {
            "attachments": [
                link
            ],
            "message": `${postMessage}`
        })
        .then(response => {
          PostApiService.savePostInfo(vkUserId, response.post_id, postMessage, link)
          .catch(e => {
            console.log("Ошибка при сохранении информации о посте");
            console.log(JSON.stringify(e));
          });

          setPostWasPosted(true);
        })
        .catch(e => {
          let errorCode = e.error_data.error_code;

          if (errorCode !== 4) {
            setError(BridgeErrorHandler.getClientErrorDescriptionByErrorCode(errorCode));
          }
        });
    }

    const handlePostMessage = (event) => {
      setPostMessage(event.detail.textContent);
    }

  const getDefaultPostMessage = () => {
    let newLineCharacter = '&#10;';
    let readonlyHashtag = '[[{"value":"#medalspb", "readonly":true}]]';

    return newLineCharacter + newLineCharacter + newLineCharacter + readonlyHashtag;
  }

    return (<Panel id={id}>
        <PanelHeader left={<Icon28ChevronBack style={{cursor: "pointer"}} onClick={go} data-to="home"/>}>
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
                    value={getDefaultPostMessage()}
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

            {error &&
            <Snackbar
                layout='vertical'
                onClose={() => setError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
              {error}
            </Snackbar>
            }

          {postWasPosted &&
          <Snackbar
              layout='vertical'
              onClose={() => setPostWasPosted(null)}
              before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16Done fill='#fff' width={16} height={16}/></Avatar>}
              duration={10000}>
            Пост успешно опубликован!
          </Snackbar>
          }
        </Group>
    </Panel>)
}

export default Post;
