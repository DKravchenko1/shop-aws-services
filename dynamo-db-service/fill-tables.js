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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var uuid_1 = require("uuid");
var dotenv = require("dotenv");
dotenv.config();
var _b = process.env, REGION = _b.REGION, ACCESS_KEY_ID = _b.ACCESS_KEY_ID, SECRET_ACCESS_KEY = _b.SECRET_ACCESS_KEY, SESSION_TOKEN = _b.SESSION_TOKEN, PRODUCT_TABLE_NAME = _b.PRODUCT_TABLE_NAME, STOCK_TABLE_NAME = _b.STOCK_TABLE_NAME;
var dynamoDB = new client_dynamodb_1.DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        sessionToken: SESSION_TOKEN,
        secretAccessKey: SECRET_ACCESS_KEY,
    }
});
var uuidArray = [(0, uuid_1.v4)(), (0, uuid_1.v4)(), (0, uuid_1.v4)(), (0, uuid_1.v4)(), (0, uuid_1.v4)()];
var params = {
    RequestItems: (_a = {},
        _a[PRODUCT_TABLE_NAME] = [
            {
                PutRequest: {
                    Item: {
                        'id': { 'S': "".concat(uuidArray[0]) },
                        'title': { 'S': 'entity-1' },
                        'description': { 'S': 'entity-description-1' },
                        'price': { 'N': '1' }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'id': { 'S': "".concat(uuidArray[1]) },
                        'title': { 'S': 'entity-2' },
                        'description': { 'S': 'entity-description-2' },
                        'price': { 'N': '2' }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'id': { 'S': "".concat(uuidArray[2]) },
                        'title': { 'S': 'entity-3' },
                        'description': { 'S': 'entity-description-3' },
                        'price': { 'N': '3' }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'id': { 'S': "".concat(uuidArray[3]) },
                        'title': { 'S': 'entity-4' },
                        'description': { 'S': 'entity-description-4' },
                        'price': { 'N': '4' }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'id': { 'S': "".concat(uuidArray[4]) },
                        'title': { 'S': 'entity-5' },
                        'description': { 'S': 'entity-description-5' },
                        'price': { 'N': '5' }
                    }
                }
            },
        ],
        _a[STOCK_TABLE_NAME] = [
            {
                PutRequest: {
                    Item: {
                        'product_id': { 'S': "".concat(uuidArray[0]) },
                        'count': { 'N': '1' },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'product_id': { 'S': "".concat(uuidArray[1]) },
                        'count': { 'N': '2' },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'product_id': { 'S': "".concat(uuidArray[2]) },
                        'count': { 'N': '3' },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'product_id': { 'S': "".concat(uuidArray[3]) },
                        'count': { 'N': '4' },
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        'product_id': { 'S': "".concat(uuidArray[4]) },
                        'count': { 'N': '5' },
                    }
                }
            },
        ],
        _a),
};
var command = new client_dynamodb_1.BatchWriteItemCommand(params);
console.log(process.env.SECRET_ACCESS_KEY, process.env.ACCESS_KEY_ID, process.env.SESSION_TOKEN);
console.log(PRODUCT_TABLE_NAME);
console.log(STOCK_TABLE_NAME);
var script = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dynamoDB.send(command)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
script();
