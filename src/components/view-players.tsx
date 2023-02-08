import { useState } from "react"
import { useQuery } from "react-query"
import { getAllPlayers } from "../api/player-info-request"


export function PlayerInfo(){

    // Multiple approaches to making the http request to load the data
    // here, use useQuery

    //deconstruct -into-> useQuery(player_data, get_player_data_function)
    const {isLoading, isError, data = []} = useQuery("playerCache", getAllPlayers)
    
    // handle the deconstructed values
    if(isLoading){
        return <p> loading... </p>
    }

    if(isError){
        return <p> trouble loading data D: </p>
    }

    // data on line 12: Returns an array of player objects to be mapped below
    return<>
    <h1> Player Info </h1>
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
                <th> Update Player Stats </th>
            </tr>
        </thead>
        <tbody>
            {data.map(p => 
            <tr key = {p.playerId}>
                <td>{p.playerId}</td>
                <td> {p.fname} {p.lname} </td>
                <td> {p.careerStats.assists} </td>
                <td> {p.careerStats.blocks} </td>
                <td> {p.careerStats.shotAttempts} </td>
                <td> {p.careerStats.madeBaskets} </td>
                <td> {p.careerStats.rebounds} </td>
            </tr>
            )}
        </tbody>
    </table>
    </>
}