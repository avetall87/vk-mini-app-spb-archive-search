export class NotificationHelper {

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

    static getNullValue = (rowValue) => {
        if (!rowValue) {
            return rowValue;
        }

        return rowValue.replaceAll('null', '');
    }

}
