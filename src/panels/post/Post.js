import React, {useState} from 'react';
import bridge from "@vkontakte/vk-bridge";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Link from "@vkontakte/vkui/dist/components/Link/Link";
import Radio from "@vkontakte/vkui/dist/components/Radio/Radio";
import {FormItem, Text, Textarea} from "@vkontakte/vkui";
import "@yaireo/tagify/dist/tagify.css"
import BridgeErrorHandler from "../../utils/BridgeErrorHandler";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import {UserInfoService} from "../../utils/UserInfoService";
import {PostApiService} from "./PostApiService";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Icon28CheckCircleFill, Icon24Info} from "@vkontakte/icons";

const Post = ({id, go, userInfo, personLink, snippetTitle, snippetImageLink}) => {

    const [postMessage, setPostMessage] = useState('');
    const [wallPostLink, setWallPostLink] = useState('');

    const [error, setError] = useState(null);
    const [postWasPosted, setPostWasPosted] = useState(false);

    const vkUserId = UserInfoService.getUserId(userInfo);
    const firstName = UserInfoService.getUserFirstName(userInfo);
    const link = personLink.replace("http:", "https:");
    const title = snippetTitle;
    const imageLink = snippetImageLink.replace("http:", "https:");

    const myMemoryLink = "https://vk.com/mymemory_medal";

    const doPost = () => {
        setError(null);
        bridge.send("VKWebAppShowWallPostBox", {
            "attachments": [
                link
            ],
            "message": `${postMessage}\n#МедальЗаОборонуЛенинграда #MedalSpb`
        })
        .then(response => {
          PostApiService.savePostInfo(vkUserId, response.post_id, postMessage + '\n#МедальЗаОборонуЛенинграда #MedalSpb', link)
          .catch(e => {
            console.log("Ошибка при сохранении информации о посте");
            console.log(JSON.stringify(e));
          });

          setPostWasPosted(true);
          setWallPostLink("https://vk.com/id" + vkUserId + "?w=wall" +vkUserId + "_" + response.post_id);
        })
        .catch(e => {
          let errorCode = e.error_data.error_code;

          if (errorCode !== 4) {
            setError(BridgeErrorHandler.getClientErrorDescriptionByErrorCode(errorCode));
          }
        });
    }

    const handlePostMessage = (event) => {
      setPostMessage(event.target.value);
    }

    return (<Panel id={id}>
        <PanelHeader className="post-panel-header" left={<Icon28ChevronBack style={{cursor: "pointer"}} onClick={go} data-to="home"/>}>
            <PanelHeaderContent>
                История о герое
            </PanelHeaderContent>
        </PanelHeader>
        <Group>
            <FormLayout>

              <FormItem top="Запись будет доступна" style={{display: 'none'}}>
                <Radio name="radio" value="1" defaultChecked>Друзья и подписчики</Radio>
                <Radio name="radio" value="2">Отправить личным сообщением</Radio>
              </FormItem>

              <FormItem className="pt-3 mb-0 pb-10 px-38">
                <Textarea className="post-textarea" autoFocus={true} onChange={handlePostMessage} value={postMessage}>
                </Textarea>
              </FormItem>

              <FormItem className="pt-0 mt-0 px-38 pb-0 mb-0">
                  <Div className="row pt-0 mt-0 pb-0 mb-0">
                      <Text className="hashtag" weight="regular">#МедальЗаОборонуЛенинграда&nbsp;</Text>
                      <Text className="hashtag" weight="regular">#MedalSpb</Text>
                  </Div>
              </FormItem>

              <Link href={link} target="_blank"><Banner
                    className="mb-0 mt-4 px-38"
                    before={<Avatar size={100} mode="image" src={imageLink} />}
                    header={title}
                    subheader="medal.spbarchives.ru"/>
              </Link>

                {(!error && !postWasPosted) &&
                    <FormItem className="pb-0 mb-0 pt-44 px-38">
                        <div className="d-flex justify-content-center align-items-center">
                            <Icon24Info className="info-icon mr-3" width={32} height={32}/>
                            <Text weight="regular">
                                Пожалуйста, не меняйте настройки видимости поста,
                                чтобы он был доступен всем. Так история сможет принять участие в акции <Link href={myMemoryLink} target="_blank">"Медаль Моей Памяти"</Link>,
                                и о подвиге Вашего героя сможет узнать как можно больше людей!
                            </Text>
                        </div>
                    </FormItem>
                }

              {error &&
                <div className="d-flex justify-content-center align-items-center pt-38">
                  <Icon28CheckCircleFill className="p-0 m-0 invisible" width={32} height={32}/>
                  <Text className="error-text" weight="regular">Во время публикации поста произошла ошибка, пожалуйста попробуйте повторить.</Text>
                </div>
              }

              {!postWasPosted &&
                <div className="d-flex justify-content-center pt-38">
                  <Button size="l" onClick={doPost}>Опубликовать</Button>
                </div>
              }

              {postWasPosted &&
                  <FormItem className="pt-0">
                      <div className="d-flex justify-content-center align-items-center pt-38">
                          <Div className="p-0 m-0 pr-3"><Icon28CheckCircleFill fill='#fff' width={32} height={32}/></Div>
                          <Text weight="regular">{firstName}, Вы успешно опубликовали историю о герое! <Link target="_blank" href={wallPostLink}>Посмотреть</Link></Text>
                      </div>
                  </FormItem>
              }

            </FormLayout>
        </Group>
    </Panel>)
}

export default Post;
