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
const dateFormat = require("dateformat");
const cron = require("node-cron");
const vote_model_1 = require("../../apis/vote/model/vote.model");
class VoteScheduler {
    constructor() {
    }
    task() {
        cron.schedule('0 0 * * *', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const now = new Date();
                try {
                    const nowDate = yield dateFormat(now, 'isoDateTime');
                    const ActiveVoteTopic = yield vote_model_1.vote.getVoteTopic();
                    const dueDate = yield dateFormat(ActiveVoteTopic.dueDate, 'isoDateTime');
                    const resultDate = yield vote_model_1.vote.getVoteDateDiff(dueDate, nowDate);
                    /** 마감기한이 지나면 데이터 업데이트 */
                    if (resultDate.dateDiff < 0) {
                        yield vote_model_1.vote.updateVoteTopic(ActiveVoteTopic.voteTopicIndex, {
                            status: 'INACTIVE'
                        });
                        const WaitingVoteTopic = yield vote_model_1.vote.getVoteTopicByStatus('WAITING');
                        yield vote_model_1.vote.updateVoteTopic(WaitingVoteTopic.voteTopicIndex, {
                            status: 'ACTIVE'
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    }
}
exports.VoteScheduler = VoteScheduler;
exports.voteScheduler = new VoteScheduler();
//# sourceMappingURL=voteScheduler.js.map