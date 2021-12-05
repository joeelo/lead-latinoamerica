export default {
  addProgram: {
      formTitle: 'Add Program', 
      list: [
      { data: 'organization', label: 'Title', placeHolder: 'what is the name of the program?' }, 
      { data: 'helpsWith', label: 'Some keywords that describe your org', placeHolder: 'Adjectives that describe your org, please separate with commas.' }, 
      { data: 'coverImage', label: 'Org Image', placeHolder: 'A URL to the program image wanted' }, 
      { data: 'missionStatement', label: 'Mission Statement', placeHolder: 'What is your mission statement?', type: 'textArea'},
      { data: 'bio', label: 'Bio', placeHolder: 'Tell us a bit about the program', type: 'textArea' }, 
      { data: 'programType', label: 'Type of program (check all that apply)', type: 'checkbox', options: ['summer', 'programs', 'internships', 'scholarships'] }, 
      { data: 'email', label: 'Your email', placeHolder: 'Best email to get in touch', validations: 'email' }, 
    ]
  }
}