export default {
  addProgram: {
      formTitle: 'Add Program', 
      list: [
      { data: 'orgTitle', label: 'Title', placeHolder: 'what is the name of the program?' }, 
      { data: 'orgHelp', label: 'Keywords to help students', placeHolder: 'Adjectives that describe your org, please separate with commas.' }, 
      { data: 'orgImage', label: 'Org Image', placeHolder: 'A URL to the program image wanted' }, 
      { data: 'orgBio', label: 'Bio', placeHolder: 'Tell us a bit about the program', type: 'textArea' }, 
      { data: 'orgEmail', label: 'Your email', placeHolder: 'Best email to get in touch', validations: 'email' }, 
    ]
  }
}