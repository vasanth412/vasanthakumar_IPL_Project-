function totalMatches(matches){

    let matchesCount = {};

    for(let index=0; index < matches.length; index++){

        if(matchesCount[matches[index].season] == undefined){
            matchesCount[matches[index].season] = 1;
        }
        else{
            matchesCount[matches[index].season] += 1;
        }
    }
    return matchesCount;

 }

function matchesWonPerYear(matches){
        
    let winningTeam = {};

    for(let index=0; index<matches.length; index++){

        if(winningTeam[matches[index].season] == undefined){
            winningTeam[matches[index].season] = {};
            index -=1;
        }
        else{

             let winner = matches[index].winner;

             if(winningTeam[matches[index].season][winner] == undefined){
                winningTeam[matches[index].season][winner] = 1;
            }
            else{
                winningTeam[matches[index].season][winner] += 1;
                }
            }
        }
    return winningTeam;
}

function extraRuns2016(matches, length, deliveries){

    let extraRun = {};
    let id;

    for(let index1=0; index1 < matches.length; index1++){
        if(matches[index1].season == '2016'){
            
            id = matches[index1].id;
            for(let index=0; index < length; index++){

                if(deliveries[index].match_id == id){   

                    let extras =  parseInt(deliveries[index].extra_runs);
                    
                    if(extraRun[deliveries[index].bowling_team] == undefined){
                          extraRun[deliveries[index].bowling_team] = extras;
                    }else{
                         extraRun[deliveries[index].bowling_team] += extras;
                    }
                }
            }   
        }
    }
    return extraRun;
}

function economicalBowlers2015(matches, deliveries, length){

    let bowlers = {};
    let match_id = [];
    
    for(let index=0; index < matches.length; index++){
        if(matches[index].season == '2015'){

            match_id.push(matches[index].id);
        }
    }

    for(let index=0; index<length; index++){

        if(match_id.includes(deliveries[index].match_id)){

            if(bowlers[deliveries[index].bowler] == undefined){
                bowlers[deliveries[index].bowler] = Number(deliveries[index].total_runs);
            }
            else{
                bowlers[deliveries[index].bowler] += Number(deliveries[index].total_runs);
            }
        }
    }
    
   let economy = {};

    for(let key of Object.keys(bowlers)){

        let overs = totalOver(key, deliveries, match_id);
        let rate = Math.round((bowlers[key]/overs)*100)/100;
        economy[key] = rate;
        
    }

    let sorted = Object.entries(economy).sort((a, b) => a[1]-b[1]);
    let topEconomy = [];

    for(let index=0; index<10; index++){
        topEconomy.push( sorted[index]);
    }

    return topEconomy;
}
            
function totalOver(bowler, deliveries, match_id){

    let overs = 1;
    let over = 0;
    let flag = true;

    for(let index=0; index<deliveries.length; index++){

        if(match_id.includes(deliveries[index].match_id)){
        
            if(deliveries[index].bowler == bowler){
                
                if(flag){

                    flag = false;
                    over = deliveries[index].over;
                }

                if(over != deliveries[index].over){
                    
                    overs += 1;
                    flag = true;
                }
            }
        }
    }
    return overs;
}

module.exports = {
    totalMatches, 
    matchesWonPerYear,
    extraRuns2016,
    economicalBowlers2015
};