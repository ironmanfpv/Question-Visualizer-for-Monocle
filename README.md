Question Visualizer for Q&A for Monocle. 

Imagine one of two scenarios:

Scenario one: You are giving a briefing or a presentation. 
Your audience have questions pertaining to what you shared but they are not able to raise it at that point in time. 
You share with them a Google Sheet for them to key in their questions. You have their questions in view.
You handle their questions at an interim juncture.

Scenario two : You are a teacher/lecturer teaching a lesson. Your students have questions. 
They hesitate to raise them as the group size is huge and they are processing their thoughts,trying to phrase their questions. 
You share with them a Google Sheet for them to key in their questions. You have their questions in view. 
You handle their doubts at a Q&A segment.

This app allows you to collate the questions from the shared Google
Sheets using Google Sheets API. The questions are listed and numbered as
they are sequenced in the Google Sheet. The webapp uploads the questions
to Monocle. Toggle forward and backward using the Touch buttons on
Monocle to traverse the uploaded questions.

<img src= "https://github.com/ironmanfpv/Project-Question-Visualizer-for-Monocle/blob/main/img/IMG_0.jpg"height="300" width="600">
<img src="https://github.com/ironmanfpv/Project-Question-Visualizer-for-Monocle/blob/main/img/IMG_1.jpg" height="300" width="600">
<img src="https://github.com/ironmanfpv/Project-Question-Visualizer-for-Monocle/blob/main/img/IMG_2.jpg" height="300" width="600">

# SETUP STEPS: # 

## Set up Credentials ##

1.  Ensure Node, NPM are installed.
2.  Create a Google Cloud Project at http://cloud.google.com/
3.  In the Google Cloud console, go to menu\>API &Services\>Credentials.
4.  Create your OAuth client ID : 
        Call it Web Client 1 (Name of your choice).
5.  Click the named Web application ; (Web Client 1):
        Authorised  JavaScript origins \> URL 1 : http://localhost:8000 
        Authorised  Redirect URIs \> URL 1 : http://localhost:8000/
6.  Click Create or Save.
7.  Note your CLient ID.

## Generate API keys ##

1.  Under API & Services\>Credentials
2.  Create credentials \> API keys
3.  Note your API keys.

## Create a Google Sheet ## 
1. Create a 3 column 31 row googlesheet (Size of sheet ; rows is up to you). 
2. First column Title : Number 
3. Second column TItle : Question 
4. Third column TItle : Participant 
5. Note down the Google Sheet ID.

## Download Code IDE and installations  ##

1.  Install Python.
2.  Install VS code and all its relevant extensions. 
        Extensions : Python, node, Brilliant AR Studio etc.
3.  In VS Code, run a copy of this project from GitHub repository.
4.  Under script.js, key in your Client ID and API keys.
5.  Under download.js, key in your Sheet ID and Sheet Range.
6.  Under upload.js, key in your Sheet ID and Sheet Range.

## Procedure to test if data is fetched ##

1.  At the project tab, click on index.html, close all other terminals and nodes.
2.  Call up a terminal.
3.  In your working directory prompt, type node.
4.  In your working directory prompt, install the http-server package by typing : npm install http-server
5.  In your working directory prompt, start a web server: npx http-server -p 8000
6.  In your browser, navigate to http://localhost:8000
7.  Click Authorise for authentication. Click continue at the prompts.
8.  When the Connect! button appears, click it to pair to the Monocle by Bluetooth. 
    Upon pairing, the Download and Upload button appears.
9.  Click Download to obtains a file named data.json that is in a readable format.
10. Cut and past the data.json file to the project folder. 
11. Sign out, close server, terminate node session.
12. In VSCode, connect to monocle, click refresh to see the files currently in Monocle.
13. Upload main.py and data.json onto Monocle by right clicking the files, 
        Brilliant AR Studio: > Upload File To Device. 
14. Done ! You are ready to see the questions raised by participants and
    scroll through them. (Please note that you may have to reboot
    Monocle by putting it back into the case and taking it out.)
15. Alternatively, click upload ; Skips steps 9 \~ 12.
16. Refresh > Connect > Upload ; helps you to curate new submitted questions.

## Credits/Acknowledgement ##

This project started off from bouncing ideas off several discord members.
and from project readings
Link : https://docs.brilliant.xyz/community/  
and finally by applying design thinking, reading api references from 
Link : https://docs.brilliant.xyz/micropython/micropython/

Some members to thank:

1) Josuah (Techplumber with brilliant labs) , for the numerous source reference and pointers.
2) milesprovus (creator of Project Monocle Teleprompter) , for his project work flow explainations. 
and also several other community members in Brilliant Lab Discord https://discord.gg/RtwpPjWPNN ,for guidance and support. 
and of course God, for HIS inspiration and his big invisible hands.

5/1/2024 (Friday)