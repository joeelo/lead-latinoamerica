// @ts-nocheck
import { v2 } from '@google-cloud/translate'

// Creates a client
const translate = new v2.Translate()

async function translateText(text) {
  try {
    const target = 'es'
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target)
    translations = Array.isArray(translations) ? translations : [translations]
    const translation = translations.map((translation) => translation)
  
    return translation
  } catch (error) {
    return ['']
  }
}

export { translateText }