# 1) return all data on players

query GetAllPlayers{
  players{
    playerId
    lname
    fname
    bioMetrics{
      weightLbs
      heightInches
    }
    careerStats{
      shotAttempts
      madeBaskets
      assists
      rebounds
      blocks
    }
  }
}

# 2) return only fname and lname

query GetPlayers{
  players{
    lname
    fname
  }
}

# 3) return lname and all stats
query GetPlayers {
  players {
    lname
    careerStats {
      assists
      blocks
      madeBaskets
      rebounds
      shotAttempts
    }
  }
}

# 4) return all players with lname Swoop
query AllPlayerNames {
  players(lname:"Swoop") {
    fname
    lname
    careerStats{
      shotAttempts
      madeBaskets
    }
  }
}

# 5) Write a query that returns returns all players with the last name as a variable
query PlayersByLname($lnameToSearch:String){
  players(lname:$lnameToSearch){
    fname
    lname
    bioMetrics{
      heightInches
      weightLbs
  	}
  }
}

variables
{
  "lnameToSearch":"Swoop"
}

# 6) Write a query that returns only all players height and weight
query PlayersByBiometrics{
    biometrics{
        heightInches
        weightLbs
    }
}

# 7) Write a query that use a fragment called stats that returns all the players stats. Use this fragment to query all players and return their playerId and stats.
query GetAllPlayers {
  players {
    fname
    lname
    ...stats
  }
}

fragment stats on BaksetballPlayer {
  playerId
  careerStats {
    assists
    madeBaskets
    shotAttempts
    blocks
    rebounds
  }
}

# 8) Write a mutation to add a new player
mutation AddTimmy{
	addPlayer(input:{
    fname:"Timmy"
    lname:"de Hopps"
    heightInches:70
    weightLbs:150
  }){
    playerId
  }
}

# 9) Write a mutation to add a new player and that checks to see what the return of the query is. ... on keyword
mutation AddTimmy{
	addPlayer(input:{
    fname:"Timmy"
    lname:"de Hopps"
    heightInches:70
    weightLbs:150
  }){
    ...on BaksetballPlayer{
      playerId
    }
  }
}

# 10) Write a mutation that uses aliasas to add two players at once
mutation AddMultiplePlayers{
	phil: addPlayer(input:{
    fname:"Phil"
    lname:"de Fouls"
    heightInches:70
    weightLbs:150
  }){
    ...on BaksetballPlayer{
      playerId
    }
  }
  
  lucas: addPlayer(input:{
    fname:"Lucas"
    lname:"de Shotz"
    heightInches:70
    weightLbs:150
  }){
    ...on BaksetballPlayer{
      playerId
    }
  }
  }

# 11) write a mutation that adds 10 rebounds to a player of your choice
mutation AddRebounds{
	mergeStats(input:{
    playerId: 2852
    rebounds: 10
  }){
    ...on BaksetballPlayer{
      fname
      lname
      careerStats{
        rebounds
      }
    }
  }
}

# 12) write a mutation that adds 10 assists, 10 blocks and 10 rebounds to a player of your choice
mutation AddRebounds{
	mergeStats(input:{
    playerId: 6621
    rebounds: 10
    assists: 10
    blocks: 10
  }){
    ...on BaksetballPlayer{
      fname
      lname
      careerStats{
        rebounds
        assists
        blocks
      }
    }
  }
}