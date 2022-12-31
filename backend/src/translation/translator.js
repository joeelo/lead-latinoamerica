const {Translate} = require('@google-cloud/translate').v2

// Creates a client
const translate = new Translate()

const text = 'The text to translate, e.g. Hello, world!'
const target = 'es'

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target)
  translations = Array.isArray(translations) ? translations : [translations]
  console.log('Translations:')
  const translation = translations.map((translation, i) => (
    `${text[i]} => (${target}) ${translation}`
  ))

  return translation
}

module.exports = translateText