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
const chalk_1 = require("chalk");
const fs = require("fs");
const app_1 = require("./app");
const slack_1 = require("./packages/core/slack/slack");
const port = 80;
const app = new app_1.Server().app;
app.set('port', port);
app.listen(app.get('port'), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.rgb(0, 153, 255) `
  **********************************************************************************************************************************                                                             
    tf        tf    tf                  tftftftftftf    tftftftftftf    tftftftftftf   tf        tf   tftftftftftf    tftftftftftf
    tf        tf    tf                  tf              tf              tf        tf   tf        tf   tf              tf        tf
    tf        tf    tf                  tf              tf              tf        tf   tf        tf   tf              tf        tf
    tftftftftftf    tftftttftftf        tftftftftftf    tftftftftftf    tftftftftftf    tf      tf    tftftftftftf    tftftftftftf
    ft        tf    tf        tf                  tf    tf              tf   tf.         tf    tf     tf              tf   tf.
    ft        tf    tf        tf                  tf    tf              tf     tf.        tf  tf      tf              tf     tf.
    ft        tf    tftftftftftf        tftftftftftf    tftftftftftf    tf       tf.       tftf       tftftftftftf    tf       tf.
  **********************************************************************************************************************************                                  
      `);
    const file = './packages/utils/config/env.json';
    let envData = fs.readFileSync(file, 'utf8');
    envData = JSON.parse(envData);
    console.log('stage:', envData.stage);
    console.log('H6 server listening on port', port);
    /** 스테이지 분기 처리 */
    if (envData.stage === 'dv' || envData.stage === 'prod') {
        yield slack_1.slack.sendDeployMessage('deploy');
    }
})).on('error', err => {
    console.error(err);
});
//# sourceMappingURL=server.js.map