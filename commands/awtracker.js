const {google} = require('googleapis');
const token = require("../token.json");
const credentials = require("../credentials.json");
const sheets = google.sheets('v4');

module.exports = {
    name: 'awtracker',
    description: 'Alliance War Participation Tracker',
    guildOnly: true,
    aliases: ['awt'],
    async execute(message, args) {
      const authClient = await authorize();
      const request = {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'AW Tracker!A1:B18',
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
            let wars = row[1];
            let warsFormatted = `${wars}${space.repeat(10 - wars.length)}`;
            wars = warsFormatted;
            formattedValues.push(wars);
                        
            // Add a newline character to the array
            formattedValues.push("\n");
          })
          formattedValues.splice(rowLength, 0, `${'='.repeat(30)}\n`);
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
