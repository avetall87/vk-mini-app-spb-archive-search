import React from 'react';
import _ from 'lodash';
import {
  Button,
  Group,
  Header,
  HorizontalScroll,
  List,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  SimpleCell,
} from '@vkontakte/vkui';
import {Icon28ChevronBack} from '@vkontakte/icons';
import './Person.css';

function getImgIdPreview(awardedDoc) {
  const awardingDocs = _.get(awardedDoc, 'awardingDocs');
  const cardOrListDoc = _.find(awardingDocs,
      doc => ['CARD', 'LIST'].includes(_.get(doc, 'docType')));
  const firstImage = _.head(_.get(cardOrListDoc, 'images'));
  const entityImageId = _.get(firstImage, 'entityImageId');
  return entityImageId
      ? `/image?imageId=${entityImageId}&type=view`
      : null;
}

export default function({
                          id,
                          go,
                          awardedDoc,
                          setActivePanel,
                          setUrlPersonLink,
                          setUrlSnippetTitle,
                          setUrlSnippetImageLink,
                        }) {
  const handleClickTell = () => {
    setUrlPersonLink(
        `${process.env.REACT_APP_API_URL}/person?docId=${_.get(
            awardedDoc, 'docId')}`);
    setUrlSnippetTitle(
        `${_.get(awardedDoc, 'fio')} — медаль «За оборону Ленинграда»`);
    setUrlSnippetImageLink(
        `${process.env.REACT_APP_API_URL}${getImgIdPreview(
            awardedDoc)}`);
    setActivePanel('post');
  };

  const personHeader = `${_.get(awardedDoc, 'fio')} ${_.get(awardedDoc,
      'birthYear')} г.р.`;

  return (
      <Panel id={id}>
        <PanelHeader left={<Icon28ChevronBack style={{cursor: 'pointer'}}
                                              onClick={go}
                                              data-to="home"/>}>
          <PanelHeaderContent>
            Медаль «За оборону Ленинграда»
          </PanelHeaderContent>
        </PanelHeader>
        <Group mode="plain"
               separator={'hide'}>
          <Header className={'red-underline'}>{personHeader}</Header>
          <List>
            <SimpleCell disabled after={_.get(awardedDoc, 'placeOfWork')}>
              Место работы:
            </SimpleCell>
            <SimpleCell disabled after={_.get(awardedDoc, 'documentNumber')}>
              Серия и номер удостоверения:
            </SimpleCell>
            <SimpleCell disabled after={_.get(awardedDoc, 'decisionNumber')}>
              Номер решения о награждении:
            </SimpleCell>
            <SimpleCell disabled after={_.get(awardedDoc, 'decisionDate')}>
              Дата решения о награждении:
            </SimpleCell>
            <SimpleCell disabled after={_.get(awardedDoc, 'awardingPlace')}>
              Место вручения:
            </SimpleCell>
          </List>
        </Group>
        <Group mode="plain"
               separator={'hide'}>
          <Header>Архивные документы о награждении</Header>
          <HorizontalScroll showArrows getScrollToLeft={i => i - 120}
                            getScrollToRight={i => i + 120}>

          </HorizontalScroll>
        </Group>
        <Group
            separator={'hide'}>
          <div className="d-flex justify-content-center pt-38">
            <Button size="l" onClick={handleClickTell}>Рассказать</Button>
          </div>
        </Group>
      </Panel>
  );
}