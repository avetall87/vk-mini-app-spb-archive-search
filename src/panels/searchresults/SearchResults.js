import './SearchResults.css';
import React, {useState, useEffect, useContext} from 'react';
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import {ContentCard, FormItem, Spinner} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Virtuoso } from 'react-virtuoso';
import _ from "lodash";
import Lala from "./Lala";
import {SearchResultsContext} from "../../context/SearchResultsContext";
import SearchResultsApiService from "./SearchResultsApiService";
import useSearchResults from "./useSearchResults";

const SearchResults = ({id, go}) => {

    const[pageNumber, setPageNumber] = useState(1);
    const[isLastPage, setIsLastPage] = useState(false);
    const[persons, setPersons] = useState([]);
    const[total, setTotal] = useState(10);

    const [searchResultsState, setSearchResultsState] = useContext(SearchResultsContext);

    const {searchQuery, currentPageNumber, listSize, initListInfo, getPersonInfoList} = useSearchResults();

    async function appendItems(){
            console.log('appendItems');
            console.log('total ' + total);
            //const personsToAppend = 10;
            console.log('current page ' + pageNumber);

            if (!isLastPage) {
                console.log('append new persons!!!');
                let newPersons1 = (pageNumber - 1) >= 0 ? await Lala.getPersonsFromServer(pageNumber-1) : [];
                console.log(newPersons1);
                let newPersons2 = await Lala.getPersonsFromServer(pageNumber);
                console.log(newPersons2);
                let newPersons3 = (pageNumber + 1) <= 10? await Lala.getPersonsFromServer(pageNumber+1) : [];
                console.log(newPersons3);

                let allNewPersons = _.concat(newPersons1, newPersons2, newPersons3);

                setPageNumber(pageNumber + 1);
                setTotal(allNewPersons[allNewPersons.length - 1].personIndex + 1);
                /*if (pageNumber === 1) {
                    newPersons = Array.from({length: 20}, () => Math.floor(Math.random() * 40));
                } else {
                    newPersons = _.takeRight(persons, 20);
                }*/

                setPersons(allNewPersons);


                if (pageNumber === 10) {
                    setIsLastPage(true);
                }

                console.log('persons after update ' + persons);
                console.log('page after update ' + pageNumber);
            }
    }

    useEffect(() => {
        function initializeSearchResults() {
            SearchResultsApiService.getPersonsFromServer(searchQuery, currentPageNumber, 6)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    initListInfo(data);
                    console.log(data);
                })
                .catch(e => {
                    console.log(JSON.stringify(e));
                })
        }

        initializeSearchResults();
    }, [searchQuery, currentPageNumber]);

    const personItem = (index) => {
        /*let personWithIndex = _.find(persons, ['personIndex', index]);

        if (_.isNil(personWithIndex)) {
            return (<div>Нет такой персоны</div>)
        } else {
            return (<div style={{height: "60px"}}>{index}!!!{personWithIndex.personInfo}:Page{pageNumber}</div>);
        }*/
        //return (<div style={{height: "60px"}}>{index}:Page{pageNumber}</div>);
        return (<div className="personItem"><ContentCard
            header={getPersonInfoList()[index].fio}
            text={getPersonInfoList()[index].placeOfWork}
        /></div>)
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<Icon28ChevronBack style={{cursor: "pointer"}} onClick={go} data-to="home"/>}>
                <PanelHeaderContent>
                    Медаль «За оборону Ленинграда»
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <FormLayout>
                    <FormItem>
                        <Div>
                            {searchResultsState.query}
                        </Div>
                    </FormItem>

                    <FormItem className="totalCount">
                        <div>Найдено записей: {searchResultsState.totalCount}</div>
                    </FormItem>

                    <FormItem className="personList">
                        {(listSize === 0) &&
                            <Spinner size="large" />
                        }
                        {(listSize !== 0) &&
                        <Virtuoso
                            fixedItemHeight={72}
                            style={{ height: "430px"}}
                            totalCount={listSize}
                            itemContent={personItem}
                            /*endReached={appendItems}*/
                            overscan={100}
                            components={{
                                Header: () => {
                                    if (pageNumber === 1) {
                                        return (<div></div>)
                                    } else {
                                        return (
                                            <div
                                                style={{
                                                    padding: '2rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                Loading 123777...
                                            </div>
                                        )
                                    }
                                },
                                Footer: () => {
                                    if(isLastPage) {
                                        return (<div></div>)
                                    } else {
                                        return (
                                            <div
                                                style={{
                                                    padding: '2rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                Loading 456888...
                                            </div>
                                        )
                                    }
                                }
                            }}
                        />
                        }
                    </FormItem>
                </FormLayout>
            </Group>
        </Panel>
    )

}

export default SearchResults;