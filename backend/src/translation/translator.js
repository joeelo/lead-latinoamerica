const { Translate } = require('@google-cloud/translate').v2

// Creates a client
const translate = new Translate()

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

module.exports = translateText