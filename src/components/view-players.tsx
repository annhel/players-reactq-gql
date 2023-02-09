import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { getAllPlayers, getPlayerByLname } from "../api/player-info-request"

type searchForm = {
    lname:string
}

export function PlayerInfo(){

    // Multiple approaches to making the http request to load the data
    // here, use useQuery

    //deconstruct -into-> useQuery(player_data, get_player_data_function)
    const { data = []} = useQuery("playerCache", getAllPlayers)
    const [searchedLname, setPlayer] = useState<searchForm>({lname:""});
    const queryClient = useQueryClient();

    const { data:data1 =[]} = useQuery(["playerCache2", searchedLname], () => getPlayerByLname(searchedLname));

    function submitSearch(){
       queryClient.invalidateQueries("playerCache2")
    }
    
    
    // // handle the deconstructed values
    // if(isLoading){
    //     return <p> loading... </p>
    // }

    // if(isError){
    //     return <p> trouble loading data D: </p>
    // }

    // data on line 12: Returns an array of player objects to be mapped below
    return<>
    <section>
        <h1> Player Info </h1>
        <label htmlFor="lname">Search by Lastname: </label>
        <input id="lname" type="text" placeholder="Smith" onChange={e => setPlayer({ lname: e.target.value})}/>
        <button onClick={submitSearch}>Search</button>
    </section>
    <section className="playerView">
    <table>
        <thead>
            <tr>
                <th> ID </th>
                <th> Player Name </th>
                <th> Assists </th>
                <th> Blocks </th>
                <th> Shots Taken </th>
                <th> Shots Made </th>
                <th> Rebounds </th>
            </tr>
        </thead>
        <tbody>
            {isEmpty(searchedLname.lname) ? (data.map(p => 
            <tr key = {p.playerId}>
                <td>{p.playerId}</td>
                <td> {p.fname} {p.lname} </td>
                <td> {p.careerStats.assists} </td>
                <td> {p.careerStats.blocks} </td>
                <td> {p.careerStats.shotAttempts} </td>
                <td> {p.careerStats.madeBaskets} </td>
                <td> {p.careerStats.rebounds} </td>
            </tr>
            )):
            (data1.map(p => 
            <tr key = {p.playerId}>
                <td>{p.playerId}</td>
                <td> {p.fname} {p.lname} </td>
                <td> {p.careerStats.assists} </td>
                <td> {p.careerStats.blocks} </td>
                <td> {p.careerStats.shotAttempts} </td>
                <td> {p.careerStats.madeBaskets} </td>
                <td> {p.careerStats.rebounds} </td>
            </tr>
            ))}
        </tbody>
    </table>
    </section>
    </>
}

function isEmpty(x:string){
    if(x.length<=0){
        return true;
    } else{
        return false;
    }
}