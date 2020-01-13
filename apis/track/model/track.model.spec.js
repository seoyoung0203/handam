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
const chai_1 = require("chai");
const track_model_1 = require("./track.model");
describe('track 모델', () => {
    let testTrackName = '경제학과';
    it('createTrack', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield track_model_1.track.createTrack({
            trackName: testTrackName
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('listTrack', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield track_model_1.track.listTrack();
        // console.log(result);
        chai_1.expect(result).instanceof(Array);
    }));
    it('pageListTrack', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield track_model_1.track.pageListTrack(1, 5);
        // console.log(result);
        chai_1.expect(result).instanceof(Array);
    }));
    it('deleteTrack', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield track_model_1.track.deleteTrack(testTrackName);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
});
//# sourceMappingURL=track.model.spec.js.map