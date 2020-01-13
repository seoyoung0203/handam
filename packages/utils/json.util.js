"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("yamljs");
var jsonUtil;
(function (jsonUtil) {
    /**
     * string을 JSON으로 변환
     * @param data
     * @returns {Object}
     */
    function jsonParser(data) {
        try {
            return (typeof data === 'string') ? JSON.parse(data) : data;
        }
        catch (err) {
            throw err;
        }
    }
    jsonUtil.jsonParser = jsonParser;
    /**
     * JSON을 string으로 변환
     * @param data
     * @param replacer
     * @param space
     * @returns {string}
     */
    function jsonStringify(data, replacer = null, space = 2) {
        return (typeof data === 'string') ? data : JSON.stringify(data, null, 2);
    }
    jsonUtil.jsonStringify = jsonStringify;
    /**
     * Error을 json 또는 string으로 변환
     * @param err
     * @param replacer
     * @param space
     * @returns {string}
     */
    function errorStringify(err, replacer = null, space = 2) {
        if (!err || typeof err !== 'object' || !Object.keys(err).length) {
            return `${err}`;
        }
        return (err.message) ? err.message : jsonStringify(err, replacer, space);
    }
    jsonUtil.errorStringify = errorStringify;
    /**
     * json을 yml로 변환
     * @param json
     * @param indent
     * @param indentation
     * @returns {string}
     */
    function jsonToYml(json, indent = 2, indentation = 8) {
        if (!json || typeof json !== 'object' || !Object.keys(json).length) {
            return `${json}`;
        }
        else if (json instanceof Error) {
            return (json.message) ? json.message : json.toString();
        }
        else {
            return yaml.stringify(json, indentation, indent);
        }
    }
    jsonUtil.jsonToYml = jsonToYml;
    /**
     * json을 log에 적합한 문자열로 변환
     * @param json
     * @param {string} key
     * @returns {string}
     */
    function jsonLogStringify(json, key = '') {
        let result = '';
        if (!json || typeof json !== 'object' || !Object.keys(json).length) {
            return (key) ? `${key}: ${json}\n` : `${json}`;
        }
        if (Array.isArray(json)) {
            key = (key) ? key : 'Array';
            json.forEach((arratValue, index) => {
                result = result + jsonLogStringify(arratValue, `${key}[${index}]`);
            });
        }
        else {
            key = (key) ? key + '.' : key;
            Object.keys(json).forEach(objectKey => {
                const value = json[objectKey];
                result = result + jsonLogStringify(value, key + objectKey);
            });
        }
        return result;
    }
    jsonUtil.jsonLogStringify = jsonLogStringify;
    /**
     * case-converter: https://github.com/travelperk/case-converter
     * deeply converts keys of an object from one case to another
     * @param oldObject
     * @param converterFunction
     * @returns {}
     */
    function convertCase(oldObject, converterFunction) {
        let newObject;
        if (!oldObject || typeof oldObject !== 'object' || !Object.keys(oldObject).length) {
            return oldObject;
        }
        if (Array.isArray(oldObject)) {
            newObject = oldObject.map(element => convertCase(element, converterFunction));
        }
        else {
            newObject = {};
            Object.keys(oldObject).forEach(oldKey => {
                const newKey = converterFunction(oldKey);
                newObject[newKey] = convertCase(oldObject[oldKey], converterFunction);
            });
        }
        return newObject;
    }
    jsonUtil.convertCase = convertCase;
    /**
     * object camlCase converter
     * @param obj
     */
    jsonUtil.toCamelCase = obj => convertCase(obj, camelCaseConverter);
    /**
     * object camlCase converter
     * @param obj
     */
    jsonUtil.toPascalCase = obj => convertCase(obj, parcalCaseConverter);
    /**
     * 첫 글자 대문자화
     * http://jsperf.com/capitalize-the-first-letter-of-string-in-javascript/2
     * @param key
     * @returns {string}
     */
    function camelCaseConverter(key) {
        return key.charAt(0).toLowerCase() + key.slice(1);
    }
    jsonUtil.camelCaseConverter = camelCaseConverter;
    /**
     * 첫 글자 소문자화
     * http://jsperf.com/capitalize-the-first-letter-of-string-in-javascript/2
     * @param key
     * @returns {string}
     */
    function parcalCaseConverter(key) {
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
    jsonUtil.parcalCaseConverter = parcalCaseConverter;
    /**
     * object null value 정리
     * 업데이트 API에서 payload를 정리할때 사용
     * https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
     * @param obj
     */
    function cleanObject(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === 'object') {
                cleanObject(obj[key]);
            }
            else if (obj[key] == null) {
                delete obj[key];
            }
            else if (obj[key] == undefined) {
                delete obj[key];
            }
        });
        return obj;
    }
    jsonUtil.cleanObject = cleanObject;
})(jsonUtil = exports.jsonUtil || (exports.jsonUtil = {}));
//# sourceMappingURL=json.util.js.map