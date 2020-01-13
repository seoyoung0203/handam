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
let CredentialDynamo = dynamo.define(`${stage}-handam-credential`, {
    hashKey: 'userIndex',
    timestamps: true,
    createdAt: true,
    updatedAt: 'updateTimestamp',
    schema: {
        userIndex: Joi.number(),
        hansungInfoId: Joi.string(),
        name: Joi.string(),
        status: Joi.string(),
        errorMessage: Joi.string()
    },
    tableName: `${stage}-handam-credential`
});
class Credential extends dynamo_util_1.Dynamo {
    constructor() {
        super(CredentialDynamo, {
            hashKey: 'userIndex'
        });
    }
    /**
     * model: Credential 생성
     * @param data
     */
    createCredential(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.status = data.status || 'UNVERIFIED';
            return yield this.create(data);
        });
    }
    /**
     * model: Credential 리스트 조회
     * @param userIndex
     */
    listCredential(userIndex) {
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
     * model: Credential 조회
     * @param userIndex
     */
    getCredential(userIndex) {
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
     * model: Credential 업데이트
     * @param userIndex
     * @param credentialData
     */
    updateCredential(userIndex, credentialData) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            credentialData.userIndex = userIndex;
            return _super("update").call(this, credentialData);
        });
    }
    /**
     * model: Credential 삭제
     * @param userIndex
     */
    deleteCredential(userIndex) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return _super("destroy").call(this, userIndex);
        });
    }
}
exports.Credential = Credential;
exports.credential = new Credential();
//# sourceMappingURL=credential.model.js.map