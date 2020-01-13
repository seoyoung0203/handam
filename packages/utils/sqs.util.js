"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require("aws-sdk");
const fs = require("fs");
const lodash = require("lodash");
var sqsUtil;
(function (sqsUtil) {
    const file = './packages/utils/config/env.json';
    let sqsData = fs.readFileSync(file, 'utf8');
    sqsData = JSON.parse(sqsData);
    aws.config.update({
        region: sqsData.region,
        accessKeyId: sqsData.accessKeyId,
        secretAccessKey: sqsData.secretAccessKey
    });
    /** SQS 객체 생성 */
    sqsUtil.sqs = new aws.SQS(sqsData.sqsApiVersion);
    /** 송신 메세지 파라미터 */
    sqsUtil.sendParams = {
        QueueUrl: sqsData.sqsUrl,
        MessageBody: null,
        DelaySeconds: 0,
        MessageGroupId: 'hansungInfo'
    };
    /** 수신 메세지 파라미터 */
    sqsUtil.receiveParams = {
        QueueUrl: sqsData.sqsUrl,
        MaxNumberOfMessages: 10
    };
    /** SQS 메세지 송신 */
    function sendMessage(sendParams) {
        sqsUtil.sqs.sendMessage(sendParams).promise()
            .then(() => {
            console.log('Message 전송 성공');
        })
            .catch(error => {
            console.error(error);
        });
    }
    sqsUtil.sendMessage = sendMessage;
    /** SQS 메세지 수신 */
    function receiveMessage(receiveParams) {
        sqsUtil.sqs.receiveMessage(receiveParams).promise()
            .then(onReceiveMessage)
            .then(deleteMessages)
            .catch(error => {
            console.error(error);
        });
    }
    sqsUtil.receiveMessage = receiveMessage;
    /** SQS 에서 받은 메시지를 콘솔에 출력 */
    function onReceiveMessage(messages) {
        console.log(messages);
        if (lodash._.isNil(messages.Messages) === false) {
            messages.Messages.forEach(message => {
                console.log(message.Body);
            });
        }
        return messages;
    }
    sqsUtil.onReceiveMessage = onReceiveMessage;
    /** SQS 에서 받은 메시지를 삭제 */
    function deleteMessages(messages) {
        if (lodash._.isNil(messages.Messages)) {
            return;
        }
        /** SQS 삭제에 필요한 형식으로 변환 */
        const entries = messages.Messages.map((msg) => {
            return {
                Id: msg.MessageId,
                ReceiptHandle: msg.ReceiptHandle,
            };
        });
        /** 메시지를 삭제 */
        return sqsUtil.sqs.deleteMessageBatch({
            Entries: entries,
            QueueUrl: sqsData.sqsUrl,
        }).promise();
    }
})(sqsUtil = exports.sqsUtil || (exports.sqsUtil = {}));
//# sourceMappingURL=sqs.util.js.map