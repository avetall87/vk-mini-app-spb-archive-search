const {NotificationHelper} = require("./NotificationHelper");

test("string as 'null' to equal ''", () => {
    expect(NotificationHelper.stringifyAndReplaceNull('null')).toBe('');
});


test("string as null to equal ''", () => {
    expect(NotificationHelper.stringifyAndReplaceNull(null)).toBe('');
});


test("some-value to equal some-value", () => {
    expect(NotificationHelper.stringifyAndReplaceNull('some-value')).toBe('some-value');
});


test("number as 123 to equal 123", () => {
    expect(NotificationHelper.stringifyAndReplaceNull(123)).toBe('123');
});


test("undefined to equal ''", () => {
    expect(NotificationHelper.stringifyAndReplaceNull(undefined)).toBe('');
});
