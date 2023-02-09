import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { CareerStats, StatsInput, updatePlayerStats } from "../api/player-info-request"

type UpdateForm = CareerStats & {playerId:number}

export function PlayerUpdateForm(){
    // use state to set new stats
    const [form, setForm] = useState<UpdateForm>({shotAttempts: 0, madeBaskets: 0, rebounds: 0, assists: 0, blocks: 0,playerId:0});

    const queryClient = useQueryClient();

    const updateStatsMutation = useMutation(updatePlayerStats, {
        onSuccess: () => queryClient.invalidateQueries("playerCache")
    })

    function setStats(){
        const selectedPlayer: StatsInput = {
            playerId: form.playerId,
            assists: form.assists,
            shotAttempts: form.shotAttempts,
            madeBaskets: form.madeBaskets,
            blocks: form.blocks,
            rebounds: form.rebounds
        }

        updateStatsMutation.mutate(selectedPlayer);
    }
    
    return<>
    <section>
    <fieldset>
        <legend> Update Player Statistics: </legend>
        <div>
            <input id="playerid" type="number" placeholder="Insert Player ID" onChange={e => setForm({...form, playerId:Number(e.target.value)})}/>
        </div>
        <div>
            <label htmlFor="assists">Assists: </label>
            <input id="" type="number" placeholder="0" onChange={e => setForm({...form, assists:Number(e.target.value)})}/>

            <label htmlFor="blocks"> Blocks: </label>
            <input id="blocks" type="number" placeholder="0" onChange={e => setForm({...form, blocks:Number(e.target.value)})}/>

            <label htmlFor="shotsTaken"> Shots Taken: </label>
            <input id="shotsTaken" type="number" placeholder="0" onChange={e => setForm({...form, shotAttempts:Number(e.target.value)})}/>
        </div>

        <div>
            <label htmlFor="shotsMade"> Shots Made: </label>
            <input id="shotsMade" type="number" placeholder="0" onChange={e => setForm({...form, madeBaskets:Number(e.target.value)})}/>

            <label htmlFor="rebounds"> Rebounds: </label>
            <input id="rebounds" type="number" placeholder="0" onChange={e => setForm({...form, rebounds:Number(e.target.value)})}/>
        </div>
    </fieldset>
    <button onClick={setStats}>Update Stats</button>
    </section>
    </>
}