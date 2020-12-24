class BridgeErrorHandler {
    constructor() {

    }

    static getClientErrorDescriptionByErrorCode (errorCode) {
        let map = new Map();

        map.set(1,	"Неизвестная ошибка");
        map.set(2,	"Пропущен обязательный параметр");
        map.set(3,	"Соединение потеряно");
        map.set(4,	"Пользователь отключен");
        map.set(5,	"Указаны неправильные параметры");
        map.set(6,	"Данная платформа не поддерживается");
        map.set(7,	"Нет разрешения на данное устройство");
        map.set(8,	"Требуется разрешение пользователя");
        map.set(9,	"Это действие нельзя выполнить в фоновом режиме");
        map.set(10,	"Достигнут лимит запросов");
        map.set(11,	"В доступе отказано");

        if (errorCode>=1 && errorCode<=11) {
            return map.get(errorCode);
        }

        return "Получен неизвестный код ошибки клиента";
    }
}

export default BridgeErrorHandler;
