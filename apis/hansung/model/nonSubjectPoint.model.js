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
const dynamo = require("dynamodb");
const fs = require("fs");
const Joi = require("joi");
const dynamo_util_1 = require("../../../packages/utils/dynamo.util");
const file = './packages/utils/config/env.json';
let dynamoData = fs.readFileSync(file, 'utf8');
dynamoData = JSON.parse(dynamoData);
const stage = dynamoData.stage === 'prod' ? 'prod' : 'dv';
let nonSubjectPointDynamo = dynamo.define(`${stage}-handam-nonSubjectPoint`, {
    hashKey: 'nonSubjectPointIndex',
    timestamps: true,
    createdAt: true,
    schema: {
        nonSubjectPointIndex: Joi.string(),
        nonSubjectPointTitle: Joi.string(),
        nonSubjectPointPublisher: Joi.string(),
        nonSubjectPointCreatedAt: Joi.string()
    },
    tableName: `${stage}-handam-nonSubjectPoint`
});
class NonSubjectPoint extends dynamo_util_1.Dynamo {
    constructor() {
        super(nonSubjectPointDynamo, {
            hashKey: 'nonSubjectPointIndex'
        });
    }
    /**
     * model: NonSubjectPoint 리스트 조회
     * @param nonSubjectPointIndex
     */
    listNonSubjectPoint(nonSubjectPointIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db
                    .query(nonSubjectPointIndex)
                    .exec((err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let hansungInfo = this.getResult(result);
                        resolve(hansungInfo);
                    }
                });
            });
        });
    }
    /**
     * model: NonSubjectPoint 조회
     * @param nonSubjectPointIndex
     */
    getNonSubjectPoint(nonSubjectPointIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db
                    .query(nonSubjectPointIndex)
                    .exec((err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let hansungInfo = this.getResult(result);
                        resolve(hansungInfo);
                    }
                });
            });
        });
    }
}
exports.NonSubjectPoint = NonSubjectPoint;
exports.nonSubjectPoint = new NonSubjectPoint();
//# sourceMappingURL=nonSubjectPoint.model.js.map