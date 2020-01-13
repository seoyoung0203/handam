"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const proxy = require("http-proxy-middleware");
const fs = require("fs");
const admissionYear_route_1 = require("./apis/admissionYear/route/admissionYear.route");
const alarm_route_1 = require("./apis/alarm/route/alarm.route");
const posts_route_1 = require("./apis/board/route/posts.route");
const postsCategory_route_1 = require("./apis/board/route/postsCategory.route");
const postsReply_route_1 = require("./apis/board/route/postsReply.route");
const postsReplyReport_route_1 = require("./apis/board/route/postsReplyReport.route");
const postsReport_route_1 = require("./apis/board/route/postsReport.route");
const postsSubscriber_route_1 = require("./apis/board/route/postsSubscriber.route");
const credential_route_1 = require("./apis/hansung/route/credential.route");
const hansungInfo_route_1 = require("./apis/hansung/route/hansungInfo.route");
const lecture_route_1 = require("./apis/lecture/route/lecture.route");
const lectureInfo_route_1 = require("./apis/lecture/route/lectureInfo.route");
const lectureReply_route_1 = require("./apis/lecture/route/lectureReply.route");
const notice_route_1 = require("./apis/notice/route/notice.route");
const lectureSchedule_route_1 = require("./apis/lectureSchedule/route/lectureSchedule.route");
const professor_route_1 = require("./apis/professor/route/professor.route");
const professorInfo_route_1 = require("./apis/professor/route/professorInfo.route");
const professorReply_route_1 = require("./apis/professor/route/professorReply.route");
const professorReplySubscriber_route_1 = require("./apis/professor/route/professorReplySubscriber.route");
const restaurantCategory_route_1 = require("./apis/restaurant/route/restaurantCategory.route");
const signIn_route_1 = require("./apis/sign/route/signIn.route");
const signUp_route_1 = require("./apis/sign/route/signUp.route");
const terms_route_1 = require("./apis/terms/route/terms.route");
// import { testRoutes } from './apis/test/route/test.route';
const restaurant_route_1 = require("./apis/restaurant/route/restaurant.route");
const restaurantImage_route_1 = require("./apis/restaurant/route/restaurantImage.route");
const restaurantMenu_route_1 = require("./apis/restaurant/route/restaurantMenu.route");
const restaurantReply_route_1 = require("./apis/restaurant/route/restaurantReply.route");
const restaurantReplyReport_route_1 = require("./apis/restaurant/route/restaurantReplyReport.route");
const restaurantReplySubscriber_route_1 = require("./apis/restaurant/route/restaurantReplySubscriber.route");
const restaurantSubscriber_route_1 = require("./apis/restaurant/route/restaurantSubscriber.route");
const restaurantTag_route_1 = require("./apis/restaurant/route/restaurantTag.route");
const track_route_1 = require("./apis/track/route/track.route");
const user_route_1 = require("./apis/user/route/user.route");
const userValidation_route_1 = require("./apis/userValidation/route/userValidation.route");
const version_route_1 = require("./apis/version/route/version.route");
const vote_route_1 = require("./apis/vote/route/vote.route");
const voteReplyRoute_route_1 = require("./apis/vote/route/voteReplyRoute.route");
const voteReplySubscriber_route_1 = require("./apis/vote/route/voteReplySubscriber.route");
const error_middleware_1 = require("./middlewares/error.middleware");
const tokenVerify_middleware_1 = require("./middlewares/tokenVerify.middleware");
class Server {
    constructor() {
        /** express 설정을 위한 express 선언 */
        this.app = express();
        /** 서버 헬스체크 */
        this.app.get('/console', function (req, res) {
            res.send('H6-server is Running');
        });
        /** vote 스케줄러 */
        // voteScheduler.task();
        /** bodyParser 선언 */
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        /** 라우터 추가 */
        this.app.use(version_route_1.versionRoutes.versionRouter);
        this.app.use(signUp_route_1.signUpRoutes.signUpRouter);
        this.app.use(signIn_route_1.signInRoutes.signInRouter);
        this.app.use(terms_route_1.termsRoutes.termsRouter);
        this.app.use(track_route_1.trackRoutes.trackRouter);
        this.app.use(admissionYear_route_1.admissionRoutes.admissionYearRouter);
        this.app.use(userValidation_route_1.userValidationRoutes.userValidationRouter);
        this.app.use(cors());
        this.app.use('/shuttle', proxy({
            target: 'http://cms.catchloc.com/api.get.member.info.all.php',
            changeOrigin: true
        }));
        const file = './packages/utils/config/env.json';
        const envData = JSON.parse(fs.readFileSync(file, 'utf8'));
        const pathRewrite = envData.stage === 'dv' ? { "/dev/reading": "/domianweb/roomview5.asp" } : { "/reading": "/domianweb/roomview5.asp" };
        this.app.use("/reading", proxy({
            target: "http://113.198.91.9",
            autoRewrite: true,
            changeOrigin: true,
            ws: true,
            pathRewrite
        }));
        /** 라우터 토큰 검증 */
        this.app.use(tokenVerify_middleware_1.verify);
        /** 라우터 추가 */
        this.app.use(alarm_route_1.alarmRoutes.alarmRouter);
        this.app.use(notice_route_1.noticeRoutes.noticeRouter);
        this.app.use(posts_route_1.postsRoutes.postsRouter);
        this.app.use(postsReply_route_1.postsReplyRoutes.postsReplyRouter);
        this.app.use(postsSubscriber_route_1.postsSubscriberRoutes.postsSubscriberRouter);
        this.app.use(postsReport_route_1.postsReportRoutes.postsReportRouter);
        this.app.use(postsReplyReport_route_1.postsReplyReportRoutes.postsReplyReportRouter);
        this.app.use(postsCategory_route_1.postsCategoryRoutes.postsCategoryRouter);
        this.app.use(vote_route_1.voteRoutes.voteRouter);
        this.app.use(voteReplyRoute_route_1.voteReplyRoutes.voteReplyRouter);
        this.app.use(voteReplySubscriber_route_1.voteReplySubscriberRoutes.voteReplySubscriberRouter);
        this.app.use(user_route_1.userRoutes.userRouter);
        this.app.use(professor_route_1.professorRoutes.professorRouter);
        this.app.use(professorReply_route_1.professorReplyRoutes.professorReplyRouter);
        this.app.use(professorInfo_route_1.professorInfoRoutes.professorInfoRouter);
        this.app.use(professorReplySubscriber_route_1.professorReplySubscriberRoutes.professorReplySubscriberRouter);
        this.app.use(lectureSchedule_route_1.lectureScheduleRoutes.lectureScheduleRouter);
        this.app.use(lecture_route_1.lectureRoutes.lectureRouter);
        this.app.use(lectureInfo_route_1.lectureInfoRoutes.lectureInfoRouter);
        this.app.use(lectureReply_route_1.lectureReplyRoutes.lectureReplyRouter);
        this.app.use(restaurant_route_1.restaurantRoutes.restaurantRouter);
        this.app.use(restaurantReply_route_1.restaurantReplyRoutes.restaurantReplyRouter);
        this.app.use(restaurantReplyReport_route_1.restaurantReplyReportRoutes.restaurantReplyReportRouter);
        this.app.use(restaurantMenu_route_1.restaurantMenuRoutes.restaurantMenuRouter);
        this.app.use(restaurantTag_route_1.restaurantTagRoutes.restaurantTagRouter);
        this.app.use(restaurantImage_route_1.restaurantImageRoutes.restaurantImageRouter);
        this.app.use(restaurantSubscriber_route_1.restaurantSubscriberRoutes.restaurantSubscriberRouter);
        this.app.use(restaurantReplySubscriber_route_1.restaurantReplySubscriberRoutes.restaurantReplySubscriberRouter);
        this.app.use(restaurantCategory_route_1.restaurantCategoryRoutes.restaurantCategoryRouter);
        this.app.use(hansungInfo_route_1.hansungInfoRoutes.hansungInfoRouter);
        this.app.use(credential_route_1.credentialRoutes.credentialRouter);
        /** 라우터 오류 처리 */
        this.app.use(error_middleware_1.notFoundError);
        this.app.use(error_middleware_1.serverError);
    }
}
exports.Server = Server;
//# sourceMappingURL=app.js.map