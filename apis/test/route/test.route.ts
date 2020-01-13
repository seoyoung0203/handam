import { Request, Response, Router } from 'express';
import { ITestData, test } from '../model/test.model';

class TestRoutes {
	public testRouter: Router = Router();

	constructor() {
		this.router();
	}

	public router() {
		this.testRouter.post('/test', createTest);
		this.testRouter.get('/test', getTest);
		this.testRouter.put('/test/testIndex/:testIndex', updateTest);
		this.testRouter.delete('/test/testIndex/:testIndex', deleteTest);
	}
}

async function createTest(req: Request, res: Response) {
	const testData: ITestData = req.body;
	try {
		const result = await test.createTest(testData);
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'createTest: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createTest: 50000'
				});
		}
	}
}

async function getTest(req: Request, res: Response) {
	try {
		const result = await test.getTest();
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'getTest: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getTest: 50000'
				});
		}
	}
}

async function updateTest(req: Request, res: Response) {
	const {testIndex} = req.params;
	const testData: ITestData = req.body;
	try {
		const result = await test.updateTest(testData, testIndex)
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'updateTest: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateTest: 50000'
				});
		}
	}
}

async function deleteTest(req: Request, res: Response) {
	const {testIndex} = req.params;
	try {
		const result = await test.deleteTest(parseInt(testIndex))
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'deleteTest: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteTest: 50000'
				});
		}
	}
}

export const testRoutes: TestRoutes = new TestRoutes();
