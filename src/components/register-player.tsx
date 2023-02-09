import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addPlayer, PlayerInput } from "../api/player-info-request";

type FormData = {
    fname: string,
    lname: string,
    heightInches: number,
    weightLbs: number
}

export function RegisterPlayer(){

    const [form, setForm] = useState<FormData>({fname: "",lname: "",heightInches: 0,weightLbs: 0})
    const queryClient = useQueryClient();

    const addPlayerMutation = useMutation(addPlayer, {
        onSuccess: ()=>{
            queryClient.invalidateQueries("playerCache")
        }
    });

    function submitPlayer(){
        const playerInput: PlayerInput ={
            fname: form.fname,
            lname: form.lname,
            heightInches: form.heightInches,
            weightLbs: form.weightLbs
        }
        addPlayerMutation.mutate(playerInput);
    }

    return<>
    <section>
    <fieldset>
        <legend>Register a Player</legend>
        <input type="text" placeholder="Firstname" onChange={e => setForm({...form, fname:e.target.value})}/>
        <input type="text" placeholder="Lastname" onChange={e => setForm({...form, lname:e.target.value})}/>
        <input type="number" placeholder="Height(In)" onChange={e => setForm({...form, heightInches:Number(e.target.value)})}/>
        <input type="number" placeholder="Weight(Lbs)" onChange={e => setForm({...form, weightLbs:Number(e.target.value)})}/>
    </fieldset>
    <button onClick={submitPlayer}> Add Player </button>
    </section>
    </>
}