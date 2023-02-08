
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
export async function updatePlayerStats(BasketballPlayer: StatsInput):Promise<BasketballPlayer>{

    const mutation = 
    `mutation PlayersByID($Input:String){
        mergeStats(lname:$Input){
            ... on BaksetballPlayer{
                playerId
                fname
                lname
                bioMetrics {
                    heightInches
                    weightLbs
                }
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

    const variables = {Input: BasketballPlayer.playerId.toString()}

      // core request code-block
      const body = JSON.stringify({mutation,variables})

      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}})
      const responseBody = await httpResponse.json();
      const players:BasketballPlayer[] = responseBody.data.players;
      return players;
}

//BONUS

// 4. request for specific player data given a last name (only full name and height)

// 5. create a player
