Question Visualizer for Q&A for Monocle. 

Imagine one of two scenarios:

Scenario one: You are giving a briefing or a presentation. 
Your audience have questions pertaining to what you shared but they are not able to raise it at the point of time. 
You share with them a Google Sheet for them to key in their questions. You have their questions in view.
You handle them at an interim juncture.

Scenario two : You are a teacher/lecturer teaching a lesson. Your students have questions. 
They hesitate to raise them as the group size is huge and they are processing their thoughts,trying to phrase their questions. 
You share with them a Google Sheet for them to key in their questions. You have their questions in view. 
You handle them at a Q&A segment.

This app allows you to collate the questions from the shared Google
Sheets using Google Sheets API. The questions are listed and numbered as
they are sequenced in the Google Sheet. The webapp uploads the questions
to Monocle. Toggle forward and backward using the Touch buttons on
Monocle to traverse the uploaded questions.

<img src= "https://github.com/ironmanfpv/Project-Question-Visualizer-for-Monocle/blob/main/img/IMG_0.jpg">
<img src="https://github.com/ironmanfpv/Project-Question-Visualizer-for-Monocle/blob/main/img/IMG_1.jpg" height="300" width="500"><img src="https://github.com/ironmanfpv/Project-Question-Visualizer-for-Monocle/blob/main/img/IMG_2.jpg" height="300" width="500">

# SETUP STEPS: # 

## Set Up credentials ##

1.  Ensure Node, NPM are installed.
2.  Create a Google Cloud Project at http://cloud.google.com/
3.  In the Google Cloud console, go to menu\>API &Services\>Credentials.
4.  Create your OAuth client ID : 
        Call it Web Client 1 (Name of your choice)
5.  Click the named Web application ; (Web Client 1): 
        Authorised  JavaScript origins \> URL 1 : http://localhost:8000 Authorised
        Redirect URIs \> URL 1 : http://localhost:8000/
6.  Click Create or Save
7.  Note your CLient ID

## Generate API keys ##

1.  Under API & Services\>Credentials
2.  Create credentials \> API keys
3.  Note your API keys

## Create a google sheet ## 
1. Create a 3 column 31 row googlesheet (Size of sheet ; rows is up to you) 
2. First column Title : Number 
3. Second column TItle : Question 
4. Third column TItle : Participant 
5. Note down the Google Sheet ID

## Download VS Code and install node ##

1.  Install Node
2.  Install python
3.  Install VS code and all its relevant extensions Extensions : Python,
    node, Brilliant AR Studio etc.
4.  Clone the project from GitHub repository
5.  Under script.js, key in your Client ID and API keys
6.  Under download.js, key in your Sheet ID and Sheet Range
7.  Under upload.js, key in your Sheet ID and Sheet Range

## Procedure to test if data is fetched from google sheet ##

1.  At the project tab, click on index.html, close all other terminals
    and nodes.
2.  Call up a terminal.
3.  In your working directory prompt, type node.
4.  In your working directory prompt, install the http-server package by
    typing in the terminnal : npm install http-server
5.  In your working directory prompt, start a web server: npx
    http-server -p 8000
6.  In your browser, navigate to http://localhost:8000.
7.  Click Authorise for authentication. Click continue at the prompts.
8.  When the Connect! button appears, click it to pair to the Monocle by
    Bluetooth. Upon pairing, the Download and Upload button appears.
9.  Click Download to obtains a file named data.json that is in a
    readable format.
10. Cut and past the data.json file to the project folder. (Formatted
    well)
11. Sign out, close server, terminate node session.
12. In VSCode, connect to monocle, click refresh to see the files
    currently in Monocle.
13. Upload main.py and data.json onto Monocle by right clicking the
    files, Brilliant AR Studio: Upload File To Device. (main.py is
    modelled after Project Monocle Teleprompter for maximum
    interoperability)
14. Done ! You are read to see the questions raised by the students and
    scroll through them. (Please note that you Will have to reboot
    Monocle by putting it back into the case and taking it out.)
15. Alternatively, click upload ; Skips steps 9 \~ 12.

## Credits/Acknowledgement ##

This project is made possible by drawing inspiration from several community project conversations.
Link : https://docs.brilliant.xyz/community/  
By applying design thinking and reading api references from 
Link : https://docs.brilliant.xyz/micropython/micropython/

Some members to thank. 
1) Josuah (Techplumber with brilliant labs) , for the numerous source reference and pointers.
2) milesprovus (creator of Project Monocle Teleprompter) , for explaining your project work flow. 

and also several other community members in Brilliant Lab Discord,forguidance and support. 
and of course God, for inspiration and his big invisible hands.

5/1/2024 (Friday)