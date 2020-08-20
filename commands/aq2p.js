const {google} = require('googleapis');
const token = require("../token.json");
const credentials = require("../credentials.json");
const sheets = google.sheets('v4');

module.exports = {
    name: 'aq2p',
    description: 'AQ Path Assignments for BG2',
    guildOnly: true,
    aliases: ['aq2paths'],
    async execute(message, args) {
      const authClient = await authorize();
      const request = {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'H13:J23',
        valueRenderOption: 'FORMATTED_VALUE',    
        auth: authClient,
      };
      try {
        const response = (await sheets.spreadsheets.values.get(request)).data;
        const formatValues = (values) => {
          let formattedValues = [];
          let rowLength = values[0].length + 1;
          values.forEach(row => {
            
            // Create space variable for alignment
            let space = ' ';
            
            // Access 1st item in array (member name), add spaces to 20 characters total, add to the new array
            let member = row[0];
            let memberFormatted = `${member}${space.repeat(20 - member.length)}`;
            member = memberFormatted;
            formattedValues.push(member);
            
            // Access 2nd item in array (path 1), add spaces to 10 characters total, add to the new array
            let s1path = row[1];
            let s1pathFormatted = `${s1path}${space.repeat(10 - s1path.length)}`;
            s1path = s1pathFormatted;
            formattedValues.push(s1path);
            
            // Access 3rd item in array (path 2), add spaces to 10 characters total, add to the new array
            let s2path = row[2];
            let s2pathFormatted = `${s2path}${space.repeat(10 - s2path.length)}`;
            s2path = s2pathFormatted;
            formattedValues.push(s2path);
            
            // Add a newline character to the array
            formattedValues.push("\n");
          })
          formattedValues.splice(rowLength, 0, `${'='.repeat(40)}\n`);
          let msg = `\`\`\`${formattedValues.join('')}\`\`\``;
          return msg;
        }
        const paths = formatValues(response.values);
        message.channel.send(paths);
      } catch (err) {
        console.error(err);
      }

      async function authorize() {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const authClient = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        );
        authClient.setCredentials(token); 
        return authClient;
      }
  }
}
