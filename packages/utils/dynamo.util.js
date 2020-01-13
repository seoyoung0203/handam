"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require("aws-sdk");
const dynamo = require("dynamodb");
const fs = require("fs");
var dynamoUtil;
(function (dynamoUtil) {
    aws.config.loadFromPath(__dirname + '/config/env.json');
    const file = './packages/utils/config/env.json';
    let dynamoData = fs.readFileSync(file, 'utf8');
    dynamoData = JSON.parse(dynamoData);
    dynamoUtil.dynamoConfig = dynamo.AWS.config.update({
        region: dynamoData.region,
        accessKeyId: dynamoData.accessKeyId,
        secretAccessKey: dynamoData.secretAccessKey
    });
})(dynamoUtil = exports.dynamoUtil || (exports.dynamoUtil = {}));
class Dynamo {
    constructor(define, config) {
        dynamoUtil.dynamoConfig;
        this.db = define;
        this.hashKey = config.hashKey;
        this.rangeKey = config.rangeKey || '';
    }
    /**
     * 항목 생성: Create (해당 항목이 없는 경우에만 수정)
     * @param params
     * @returns {Promise<*>|Promise}
     */
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.create(params, { overwrite: false }, (err, item) => {
                    if (err) {
                        if (err.code === 'ConditionalCheckFailedException') {
                            reject('DynamoDB item already exists'); // 이미 존재하는 항목
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        resolve(item.get());
                    }
                });
            });
        });
    }
    /**
     * 항목 일괄 생성: bulkCreate (해당 항목이 없는 경우에만 수정)
     * @param params
     */
    bulkCreate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.create(params, { overwrite: false }, (err, items) => {
                    if (err) {
                        if (err.code === 'ConditionalCheckFailedException') {
                            reject('DynamoDB item already exists'); // 이미 존재하는 항목
                        }
                        else {
                            reject(err);
                        }
                    }
                    else {
                        let results = [];
                        for (let row of items) {
                            row = row.get();
                            results.push(row);
                        }
                        resolve(results);
                    }
                });
            });
        });
    }
    /**
     * 단일 항목 가져오기
     * @param index
     * @param attributes
     * @returns {Promise<*>}
     */
    get(index, attributes = null) {
        let expressions = {};
        if (attributes && attributes.length) {
            expressions.ProjectionExpression = attributes.join(',');
        }
        return new Promise((resolve, reject) => {
            this.db.get(index, expressions, (err, data) => {
                if (err) {
                    reject(err);
                }
                else if (data === null) {
                    reject('DynamoDB item does not exist'); // 존재하지 않는 항목
                }
                else {
                    resolve(data.get());
                }
            });
        });
    }
    /**
     * 항목 생성: Put (해당 항목이 이미 있을 경우 수정)
     * @param item
     * @returns {Promise<*>|Promise}
     */
    put(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.create(item, (err, item) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(item.get());
                    }
                });
            });
        });
    }
    /**
     * 항목 업데이트 (해당 항목이 이미 있을 경우에만 수정)
     * @param params
     * @returns {Promise<*>|Promise}
     */
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.update(params, { expected: { [this.hashKey]: { Exists: true } } }, (err, item) => {
                    if (err) {
                        switch (err.code) {
                            case 'ConditionalCheckFailedException':
                            case 'ResourceNotFoundException':
                                reject('DynamoDB item does not exist'); // 존재하지 않는 항목
                                break;
                            case 'ValidationException':
                                reject('ValidationException'); // 존재하지 않는 항목
                                break;
                            default:
                                reject(err);
                        }
                    }
                    else {
                        resolve(item.attrs);
                    }
                });
            });
        });
    }
    /**
     * 항목 삭제
     * @returns {Promise<*>|Promise}
     * @param params
     */
    destroy(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.destroy(params, { ReturnValues: 'ALL_OLD' }, (err, item) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!item) {
                        reject('DynamoDB item does not exist'); // 존재하지 않는 항목
                    }
                    else {
                        resolve(item.attrs);
                    }
                });
            });
        });
    }
    /**
     * 체크 Key Value
     * @param key
     * @param value
     * @returns {Promise<*>|Promise}
     */
    checkKeyValue(key, value) {
        return new Promise((resolve, reject) => {
            this.db.scan()
                .where(key)
                .gte(value)
                .exec((err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.checkResults(data));
                }
            });
        });
    }
    /**
     * hashKey로 해당 항목 존재 유무 체크
     * True === 해당 항목이 있음
     * False === 해당 항목이 없음
     *
     * @param hashKey
     * @returns {Promise<*>|Promise}
     */
    checkByHashKey(hashKey) {
        return new Promise((resolve, reject) => {
            this.db.query(hashKey).exec((err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.checkResults(data));
                }
            });
        });
    }
    /**
     * 쿼리 항목 유무
     * @param data
     * @returns {boolean}
     */
    checkResults(data) {
        return !!data.Count;
    }
    /**
     * 쿼리 항목 반환: 쿼리한 항목이 1개
     * @param data
     * @returns {*}
     */
    getResult(data) {
        if (data.Items.length > 1) {
            throw new Error('Query result has more than two items');
        }
        else if (data.Items.length === 0) {
            return null;
        }
        else {
            return data.Items[0].attrs;
        }
    }
    /**
     * 쿼리 항목 반환: 쿼리한 항목이 다수 개
     * @param data
     * @returns {*}
     */
    getResults(data) {
        return data.Items.map((item) => {
            return item.attrs;
        });
    }
    /**
     * 쿼리 항목 반: 쿼리한 항목이 다수 개이고 페이지네이션 가능하도록 nextToken 값 추가
     * @param data
     */
    getPageResults(data) {
        return {
            nextToken: data.LastEvaluatedKey || null,
            results: data.Items.map((item) => {
                return item.attrs;
            })
        };
    }
    /**
     * 항목 생성
     * @param items
     * @returns {Promise<*>}
     */
    putItems(items) {
        let promises = items.map((item) => {
            return this.put(item);
        });
        return Promise.all(promises);
    }
    /**
     * 항목 삭제
     * @param items
     * @returns {Promise<*>}
     */
    destoryItems(items) {
        const promises = items.map((item) => {
            let params = {};
            params[this.hashKey] = item[this.hashKey];
            if (this.rangeKey && item[this.rangeKey]) {
                params[this.rangeKey] = item[this.rangeKey];
            }
            return this.destroy(params);
        });
        return Promise.all(promises);
    }
}
exports.Dynamo = Dynamo;
//# sourceMappingURL=dynamo.util.js.map