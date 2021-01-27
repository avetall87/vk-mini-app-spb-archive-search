export class DeviceService {
    static MAX_MOBILE_SCREEN_WIDTH = 576;

    static isMobileDevice() {
        return document.body.clientWidth <= this.MAX_MOBILE_SCREEN_WIDTH;
    }

    static isDeviceWithMaxMobileSizeOrGreater() {
        return document.body.clientWidth >= this.MAX_MOBILE_SCREEN_WIDTH;
    }
}