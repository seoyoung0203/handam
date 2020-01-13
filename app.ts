import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as proxy from 'http-proxy-middleware';
import * as fs from 'fs';
import { admissionRoutes } from './apis/admissionYear/route/admissionYear.route';
import { alarmRoutes } from './apis/alarm/route/alarm.route';
import { postsRoutes } from './apis/board/route/posts.route';
import { postsCategoryRoutes } from './apis/board/route/postsCategory.route';
import { postsReplyRoutes } from './apis/board/route/postsReply.route';
import { postsReplyReportRoutes } from './apis/board/route/postsReplyReport.route';
import { postsReportRoutes } from './apis/board/route/postsReport.route';
import { postsSubscriberRoutes } from './apis/board/route/postsSubscriber.route';
import { credentialRoutes } from './apis/hansung/route/credential.route';
import { hansungInfoRoutes } from './apis/hansung/route/hansungInfo.route';
import { lectureRoutes } from './apis/lecture/route/lecture.route';
import { lectureInfoRoutes } from './apis/lecture/route/lectureInfo.route';
import { lectureReplyRoutes } from './apis/lecture/route/lectureReply.route';
import { noticeRoutes } from './apis/notice/route/notice.route';
import { professorRoutes } from './apis/professor/route/professor.route';
import { professorInfoRoutes } from "./apis/professor/route/professorInfo.route";
import { professorReplyRoutes } from './apis/professor/route/professorReply.route';
import { professorReplySubscriberRoutes} from "./apis/professor/route/professorReplySubscriber.route";
import { restaurantCategoryRoutes } from './apis/restaurant/route/restaurantCategory.route';
import { signInRoutes } from './apis/sign/route/signIn.route';
import { signUpRoutes } from './apis/sign/route/signUp.route';
import { termsRoutes } from './apis/terms/route/terms.route';
// import { testRoutes } from './apis/test/route/test.route';
import { restaurantRoutes } from './apis/restaurant/route/restaurant.route';
import { restaurantImageRoutes } from './apis/restaurant/route/restaurantImage.route';
import { restaurantMenuRoutes } from './apis/restaurant/route/restaurantMenu.route';
import { restaurantReplyRoutes } from './apis/restaurant/route/restaurantReply.route';
import { restaurantReplyReportRoutes } from './apis/restaurant/route/restaurantReplyReport.route';
import { restaurantReplySubscriberRoutes } from './apis/restaurant/route/restaurantReplySubscriber.route';
import { restaurantSubscriberRoutes } from './apis/restaurant/route/restaurantSubscriber.route';
import { restaurantTagRoutes } from './apis/restaurant/route/restaurantTag.route';
import { trackRoutes } from './apis/track/route/track.route';
import { userRoutes } from './apis/user/route/user.route';
import { userValidationRoutes } from './apis/userValidation/route/userValidation.route';
import { versionRoutes } from './apis/version/route/version.route';
import { voteRoutes } from './apis/vote/route/vote.route';
import { voteReplyRoutes } from './apis/vote/route/voteReplyRoute.route';
import { voteReplySubscriberRoutes } from './apis/vote/route/voteReplySubscriber.route';
import { notFoundError, serverError } from './middlewares/error.middleware';
import { verify } from './middlewares/tokenVerify.middleware';
import { voteScheduler } from './schedulers/vote/voteScheduler';
import {nonSubjectPointRoutes} from "./apis/hansung/route/nonSubjectPoint.route";

export class Server {
	/** app 에 대한 타입 설정 */
	public app: express.Application;

	constructor() {
		/** express 설정을 위한 express 선언 */
		this.app = express();
		/** 서버 헬스체크 */
		this.app.get('/console', function(req, res) {
			res.send('H6-server is Running');
		});
		/** vote 스케줄러 */
		// voteScheduler.task();
		/** bodyParser 선언 */
		this.app.use(bodyParser.urlencoded({extended: false}));
		this.app.use(bodyParser.json());
		/** 라우터 추가 */
		this.app.use(versionRoutes.versionRouter);
		this.app.use(signUpRoutes.signUpRouter);
		this.app.use(signInRoutes.signInRouter);
		this.app.use(termsRoutes.termsRouter);
		this.app.use(trackRoutes.trackRouter);
		this.app.use(admissionRoutes.admissionYearRouter);
		this.app.use(userValidationRoutes.userValidationRouter);
		this.app.use(cors());
		this.app.use('/shuttle',
			proxy({
				target: 'http://cms.catchloc.com/api.get.member.info.all.php',
				changeOrigin: true
			})
		);

		const file = './packages/utils/config/env.json';
		const envData = JSON.parse(fs.readFileSync(file, 'utf8'));
		const pathRewrite = envData.stage === 'dv' ? { "/dev/reading": "/domianweb/roomview5.asp" } : { "/reading": "/domianweb/roomview5.asp" };
		this.app.use("/reading",
			proxy({
				target: "http://113.198.91.9",
				autoRewrite: true,
				changeOrigin: true,
				ws: true,
				pathRewrite
			})
		);
		/** 라우터 토큰 검증 */
		this.app.use(verify);
		/** 라우터 추가 */
		this.app.use(alarmRoutes.alarmRouter);
		this.app.use(noticeRoutes.noticeRouter);
		this.app.use(postsRoutes.postsRouter);
		this.app.use(postsReplyRoutes.postsReplyRouter);
		this.app.use(postsSubscriberRoutes.postsSubscriberRouter);
		this.app.use(postsReportRoutes.postsReportRouter);
		this.app.use(postsReplyReportRoutes.postsReplyReportRouter);
		this.app.use(postsCategoryRoutes.postsCategoryRouter);
		this.app.use(voteRoutes.voteRouter);
		this.app.use(voteReplyRoutes.voteReplyRouter);
		this.app.use(voteReplySubscriberRoutes.voteReplySubscriberRouter);
		this.app.use(userRoutes.userRouter);
		this.app.use(professorRoutes.professorRouter);
		this.app.use(professorReplyRoutes.professorReplyRouter);
		this.app.use(professorInfoRoutes.professorInfoRouter);
		this.app.use(professorReplySubscriberRoutes.professorReplySubscriberRouter);
		this.app.use(lectureRoutes.lectureRouter);
		this.app.use(lectureInfoRoutes.lectureInfoRouter);
		this.app.use(lectureReplyRoutes.lectureReplyRouter);
		this.app.use(restaurantRoutes.restaurantRouter);
		this.app.use(restaurantReplyRoutes.restaurantReplyRouter);
		this.app.use(restaurantReplyReportRoutes.restaurantReplyReportRouter);
		this.app.use(restaurantMenuRoutes.restaurantMenuRouter);
		this.app.use(restaurantTagRoutes.restaurantTagRouter);
		this.app.use(restaurantImageRoutes.restaurantImageRouter);
		this.app.use(restaurantSubscriberRoutes.restaurantSubscriberRouter);
		this.app.use(restaurantReplySubscriberRoutes.restaurantReplySubscriberRouter);
		this.app.use(restaurantCategoryRoutes.restaurantCategoryRouter);
		this.app.use(hansungInfoRoutes.hansungInfoRouter);
		this.app.use(credentialRoutes.credentialRouter);
		this.app.use(nonSubjectPointRoutes.nonSubjectPointRoute);
		/** 라우터 오류 처리 */
		this.app.use(notFoundError);
		this.app.use(serverError);
	}
}
