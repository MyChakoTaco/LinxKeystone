----- LinxKeystone -----

A discord bot to help Linx manage keystones <3

----- Installation Instructions -----

Requirements
  - Git
    Installation URL: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
  - Node.JS 16.0.0
    Installation URL: https://nodejs.org/en/download/current/

Steps
1.  Install software requirements
2.  Clone repository in desired file location
    For instance, this will save repo at C:\

    > cd C:\
    > git clone https://github.com/MyChakoTaco/LinxKeystone.git

3.  Get latest branches from remote repo

    > cd C:\LinxKeystone
    > git fetch origin

4.  Move to most recent branch

    > git checkout master

5.  Add/Edit C:\LinxKeystone\config.json file with the following information

    ```
    {
     "clientId": <Your bot's client ID (Check Discord)>,
     "guildId": <Your server's client ID (Check Discord)>,
     "token": <Your bot's token>,
     "astralKeysBakFile": <File location of AstralKeys bak File>
    }
    ```

6.  Install packages

    > cd C:\LinxKeystone
    > npm install

7.  Deploy commands

    > node deploys-commands.js

8.  Run project

    > cd C:\LinxKeystone
    > npm start

9.  Profit???
10. When finished, Ctrl + C to cancel script

Repeat steps 3 - 8 when viewing updated codebase
