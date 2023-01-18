"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.IS_DEV = exports.getEnv = void 0;
const yaml_1 = require("yaml");
const path = require("path");
const fs = require("fs");
const getEnv = () => {
    return process.env.RUNNING_ENV;
};
exports.getEnv = getEnv;
exports.IS_DEV = (0, exports.getEnv)() === 'dev';
const getConfig = () => {
    const environment = (0, exports.getEnv)();
    console.log(environment, '当前运行的环境');
    let yamlPath = path.join(process.cwd(), `./application.prod.yml`);
    if (environment) {
        yamlPath = path.join(process.cwd(), `./application.${environment}.yml`);
    }
    const file = fs.readFileSync(yamlPath, 'utf8');
    const config = (0, yaml_1.parse)(file);
    return config;
};
exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map