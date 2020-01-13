"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
let stage;
if (dynamoData.stage === 'prod') {
    stage = 'prod';
}
else {
    stage = 'dv';
}
let HansungInfoDynamo = dynamo.define(`${stage}-handam-hansungInfo`, {
    hashKey: 'userIndex',
    timestamps: true,
    createdAt: true,
    updatedAt: 'updateTimestamp',
    schema: {
        userIndex: Joi.number(),
        hansungInfoId: Joi.string(),
        hansungInfoPw: Joi.string(),
        name: Joi.string(),
        department: Joi.string(),
        status: Joi.string(),
        errorMessage: Joi.string(),
        accessCount: Joi.number(),
        schedule: Joi.object(),
        summaryGrades: Joi.object(),
        detailGrades: Joi.array(),
        nonSubjectPoint: Joi.object(),
        nonSubjectPointDetail: Joi.array()
    },
    tableName: `${stage}-handam-hansungInfo`
});
class HansungInfo extends dynamo_util_1.Dynamo {
    constructor() {
        super(HansungInfoDynamo, {
            hashKey: 'userIndex'
        });
    }
    /**
     * model: hansungInfo 생성
     * @param data
     */
    createHansungInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.status = data.status || 'UNVERIFIED';
            return yield this.create(data);
        });
    }
    /**
     * model: HansungInfo 리스트 조회
     * @param userIndex
     */
    listHansungInfo(userIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db
                    .query(userIndex)
                    .exec((err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let hansungInfo = this.getResults(result);
                        resolve(hansungInfo);
                    }
                });
            });
        });
    }
    /**
     * model: HansungInfo 조회
     * @param userIndex
     */
    getHansungInfo(userIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db
                    .query(userIndex)
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
     * model: HansungInfo 업데이트
     * @param userIndex
     * @param hansungInfoData
     */
    updateHansungInfo(userIndex, hansungInfoData) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            hansungInfoData.userIndex = userIndex;
            return _super("update").call(this, hansungInfoData);
        });
    }
    /**
     * model: HansungInfo 삭제
     * @param userIndex
     */
    deleteHansungInfo(userIndex) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return _super("destroy").call(this, userIndex);
        });
    }
}
exports.HansungInfo = HansungInfo;
exports.hansungInfo = new HansungInfo();
//# sourceMappingURL=hansungInfo.model.js.map