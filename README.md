#  **Vasanthakumar_IPL_Project**

## **Package Name**
ipl-project

## **License**
ISC - The ISC license is a permissive free software license published by the Internet Software Consortium, now called Internet Systems Consortium.

## **Dependency**
Using csv parser 3.0.0
```bash
npm install csv-parser
```

## **devDependency**
eslint
Command for install eslint

```bash
npm install -g eslint
```
prettier
```bash
npm install prettier
```


## **File directories**
- src folder
    - server
        - index.js
        - ipl.js
    - data
        - matches.csv
        - deliveries.cvv
    - public
        - output
            - matchesPerYear.json
            - winningMatches.json
            - extraRuns.json
            - economicalBowlers.json
        - inex.html
        - style.css
- package.json
- package-lock.json
- .gitignore

## **Output**

Output files 
- src/
    - public/
        - output
            - matchesPerYear.json
            - matchesWonPerYear.json
            - extraRunsPerTeam2016.json
            - economicalBowlers2015.json

## **Commands in Project**
1. git init
2. npm init
3. npm install CSV-parser
4. Edit script in package.json file

## **Run Command for this IPL-Project**
1. Getting json file.
Type the command **npm start**.
2. Getting chart datas.
change directories
    - IPL/
        - src/
            - public/
3. Run the server
Type command **http-server**
4.Check the browser
**http://localhost:8080/**
    

## Formula
Calculate bowler economy

Bowler economy = Runs conceded/ Overs Bowler Bowled


