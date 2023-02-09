
// 1. export or create the types of the data you're fetching
export type BasketballPlayer = {
    playerId:    number
    fname:       string
    lname:       string
    bioMetrics:  BioMetrics
    careerStats: CareerStats
}
export type BioMetrics = {
    heightInches: number
    weightLbs:    number
}

export type CareerStats = {
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}

// 2. create a specifc type for Mutate Request
// in this case player-id is ommitted as its assigned once successfully creating a player
export type PlayerStatMutation = {
    playerId: number,
    careerStats: CareerStats
}

export type StatsInput = {
    playerId: number
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}

// 3. create a Http-Fetch requests for loading and mutating player data
// 3.1 Request for allPlayers to be used in <PlayerInfo>
export async function getAllPlayers():Promise<BasketballPlayer[]>{
    const query = 
    `query PlayerStats {
        players {
          playerId
          fname
          lname
          careerStats {
            assists
            blocks
            madeBaskets
            rebounds
            shotAttempts
          }
        }
      }`
    
    const body = JSON.stringify({query})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}});
    const responseBody = await httpResponse.json();
    const players:BasketballPlayer[] = responseBody.data.players;
    return players
}

// 3.2 Request for player info to be updated, given an ID
export async function updatePlayerStats(BasketballPlayer: StatsInput):Promise<BasketballPlayer[]>{

    const mutation = 
    `mutation setStats($playerInput:StatsInput!){
        mergeStats(input: $playerInput){
            ... on BaksetballPlayer{
                playerId
                careerStats {
                  shotAttempts
                  madeBaskets
                  rebounds
                  assists
                  blocks
                }
              }
        }
        
      }`

    const variables = {playerInput: BasketballPlayer}

      // core request code-block
      const body = JSON.stringify({query:mutation,variables: variables})

      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}})
      const responseBody = await httpResponse.json();
      const player: BasketballPlayer[] = responseBody.data.players;
      return player;
}

//BONUS

type searchedName = {
    lname:string
}
// 4. request for specific player data given a last name (only full name and height)
export async function getPlayerByLname(name: searchedName):Promise<BasketballPlayer[]>{
    const query = 
    `query getByLname($playerInput:String){
        players(lname: $playerInput){
     			playerId
              	fname
             	 	lname
                careerStats {
                  shotAttempts
                  madeBaskets
                  rebounds
                  assists
                  blocks
                }
        }
      }`

      const variables = {playerInput: name.lname};
      const body = JSON.stringify({query, variables});
      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}});
      const responseBody = await httpResponse.json();
      const player: BasketballPlayer[] = responseBody.data.players;
      return player;
}

// 5. create a player
export type PlayerInput = {
    fname: string,
    lname: string,
    heightInches: number,
    weightLbs: number
}
export async function addPlayer(newPlayer: PlayerInput): Promise<{playerId: number}>{

    const query = 
    `mutation AddPlayer($playerInput:NewPlayerInput!){
  
        addPlayer(input:$playerInput){
          playerId
        }
      }`

    const variables = {playerInput:newPlayer};
    const requestBody: string = JSON.stringify({query, variables})
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    const playerInfo:{playerId:number} = responseBody.data.addPlayer;
    return playerInfo;
}