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
exports.translateText = translateText;
// @ts-nocheck
const translate_1 = require("@google-cloud/translate");
// Creates a client
const translate = new translate_1.v2.Translate();
function translateText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const target = 'es';
            // Translates the text into the target language. "text" can be a string for
            // translating a single piece of text, or an array of strings for translating
            // multiple texts.
            let [translations] = yield translate.translate(text, target);
            translations = Array.isArray(translations) ? translations : [translations];
            const translation = translations.map((translation) => translation);
            return translation;
        }
        catch (error) {
            return [''];
        }
    });
}
