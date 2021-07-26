export default {
  addProgram: {
      formTitle: 'Add Program', 
      list: [
      { data: 'orgTitle', label: 'Title', placeHolder: 'what is the name of the program?' }, 
      { data: 'orgHelp', label: 'How you can help', placeHolder: 'Please put a list of comma separated adjectives' }, 
      { data: 'orgImage', label: 'Org Image', placeHolder: 'A URL to the program image wanted' }, 
      { data: 'orgTags', label: 'Tags', placeHolder: 'Keywords that may help one locate this program' },
      { data: 'orgBio', label: 'Bio', placeHolder: 'Tell us a bit about the program', type: 'textArea' }, 
    ]
  }
}