import _ from "lodash";

export default class NotificationHelper {

    static mapSearchKeyToHumanName = (key) =>  {
        switch (key) {
            case 'query':
                return '';

            case 'fio':
                return 'ФИО';

            case 'birthYear':
                return 'Год рождения';

            case 'documentNumber':
                return 'Серия и номер удостоверения';

            case 'placeOfWork':
                return 'Место работы';

            case 'birthYearFrom':
                return 'Год рождения с'

            case 'birthYearTo':
                return 'Год рождения по'

            default:
                return '-';
        }
    }

    static stringifyAndReplaceNull = (rowValue) => {
        try {
            if (!rowValue) {
                return '';
            }

            if (typeof rowValue === 'string') {
                return _.replace(rowValue, 'null', '');
            } else {
                return _.replace(rowValue.toString(), 'null', '');
            }

        } catch (e) {
            console.log('getNullValue exception - ' + e.name + ":" + e.message + "\n" + e.stack);
            return '';
        }
    }

}
