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
