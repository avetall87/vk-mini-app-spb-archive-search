import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import bridge from '@vkontakte/vk-bridge';

import './Widget.css';
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Icon16ErrorCircleFill, Icon24ListAdd} from "@vkontakte/icons";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

const Widget = ({id, go, vkGroupId, communityToken}) => {

    const APP_LINK = "https://vk.com/app7643740";

    const [widgetError, setWidgetError] = useState(false);

    const [title, setTitle] = useState('Медаль «За оборону Ленинграда»');
    const [text, setText] = useState('Архивные документы о награжденных медалью');
    const [descr, setDescr] = useState('В базу внесены данные на 167 939 персоналий. Работа продолжается');
    const [more, setMore] = useState('Найти архивные документы');
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

    const onAddImage = () => {

        // bridge.send("VKWebAppGetGroupInfo", {"group_id": Number(vkGroupId)})
        //     .then(response=> alert("1"+JSON.stringify(response)))
        //     .catch(e=>alert("2"+JSON.stringify(e)));

         // fetch(`https://api.vk.com/method/appWidgets.getGroupImageUploadServer?image_type=160x160&access_token=7db5c2e2fd34c19a35475e1022983a2ec660364df07ca76d52c5e5440cd3141b349b2f85e933567361c11&v=5.124`)
         //     .then(res => console.log(JSON.stringify(res)))
         //     .catch(e => console.log(JSON.stringify(e)));
    }

    const onDeleteImage = () => {

    }

    const addWidget = () => {
        try {
            let groupId = Number(vkGroupId);

            let widgetData = {
                title: title,
                text: text,
                descr: descr,
                more: more,
                more_url: moreUrl
            };

            bridge.send("VKWebAppShowCommunityWidgetPreviewBox",
                {"group_id": groupId, "type": "text", "code": `return ${JSON.stringify(widgetData)};`})
                .then(r => console.log(r.result))
                .catch(e => {
                    setWidgetError(true);
                    console.log(e);
                });

        } catch (ex) {
            setWidgetError(true);
            console.log(ex);
        }
    }

    return (<Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>
                <PanelHeaderContent>
                    <span class="PageHeaderContent">Настройки виджета</span>
                </PanelHeaderContent>
            </PanelHeader>

            <FormLayout>
                <Input id="titleId"
                       top="заголовок виджета, до 100 символов"
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

                {/*<FormLayoutGroup top="Выбирите размер изображение" bottom="Необходимо загружать изображения в утроенном размере (например, для картинки с конечным размером 160x160 нужно загружать изображение размером 480x480).">*/}
                {/*    <Select placeholder="">*/}
                {/*        <option>24x24</option>*/}
                {/*        <option>50x50</option>*/}
                {/*        <option>160x160</option>*/}
                {/*        <option>160x240</option>*/}
                {/*        <option>510x128</option>*/}
                {/*    </Select>*/}
                {/*    <Div>*/}
                {/*        <Button mode="primary" title="Добавить изображение" onClick={onAddImage} before={<Icon24Camera/>}>Добавить изображение</Button>*/}
                {/*    </Div>*/}
                {/*</FormLayoutGroup>*/}

                <Div style={{display: "flex", justifyContent: "space-between"}}>
                    {/*<Button mode="secondary" before={<Icon24Delete/>} size="l">Удалить виджет</Button>*/}
                    <Button mode="primary" size="l" className="SearchButton" title="Опубликовать виджет" onClick={addWidget} before={<Icon24ListAdd/>}>Опубликовать виджет</Button>
                </Div>
            </FormLayout>

            {widgetError &&
            <Snackbar
                layout='vertical'
                onClose={() => setWidgetError(null)}
                before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
                duration={10000}>
                Произошла ошибка при добавлении виджета !
            </Snackbar>
            }

        </Panel>
    )
};

export default Widget;
