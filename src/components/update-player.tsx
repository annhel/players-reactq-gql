import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { CareerStats, updatePlayerStats } from "../api/player-info-request"

type UpdateForm = CareerStats & {playerId:number}

export function PlayerUpdateForm(){
    // use state to set new stats
    const [form, setForm] = useState<UpdateForm>({shotAttempts: 0, madeBaskets: 0, rebounds: 0, assists: 0, blocks: 0,playerId:0});

    const queryClient = useQueryClient();

    const updateStatsMutation = useMutation(updatePlayerStats, {
        onSuccess: () => queryClient.invalidateQueries("playercache")
    })

    function setStats(){
        
    }
    
    return<>
    <h2>Insert Player ID: </h2>
    <input type="number" />
    <fieldset>
        <legend> Update Player: </legend>
        
        <label htmlFor="assists">Assists: </label>
        <input id="" type="number" placeholder="0" onChange={e => setForm({...form, assists:Number(e.target.value)})}/>

        <label htmlFor="blocks"> Blocks: </label>
        <input id="blocks" type="number" placeholder="0" onChange={e => setForm({...form, blocks:Number(e.target.value)})}/>

        <label htmlFor="shotsTaken"> Shots Taken: </label>
        <input id="shotsTaken" type="number" placeholder="0" onChange={e => setForm({...form, shotAttempts:Number(e.target.value)})}/>

        <label htmlFor="shotsMade"> Shots Made: </label>
        <input id="shotsMade" type="number" placeholder="0" onChange={e => setForm({...form, madeBaskets:Number(e.target.value)})}/>

        <label htmlFor="rebounds"> Rebounds: </label>
        <input id="rebounds" type="number" placeholder="0" onChange={e => setForm({...form, rebounds:Number(e.target.value)})}/>
    </fieldset>
    <button onClick={setStats}>Update Stats</button>
    </>
}