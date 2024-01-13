import { useContext, useState } from 'react'
import { Button } from '@fluentui/react-components'
import { TeamsFxContext } from './Context'

export default function Token() {

    const { teamsUserCredential } = useContext(TeamsFxContext);
    const [token, setToken] = useState<string>("");
    const [error, setError] = useState<any>("");
    const [state, setState] = useState<any>("idle");

    const getToken = async () => {

        setState("getting token");
        try {
            const result = await teamsUserCredential?.getToken("User.Read")
            console.log(result)
            let token = result?.token;
            setToken(`${token?.substring(0, 5)}...` || "No Token")
            setState("token received");
        }
        catch (e: any) {
            setState("token failed");
            setError(e)
        }

    }

    const login = async () => {
        setState("starting Login");
        try {
            await teamsUserCredential?.login("User.Read");
        }
        catch (e: any) {
            setState("login failed");
            setError(e)
        }
        setState("login complete");
    }


    return (
        <>
            <Button onClick={login}>Login</ Button>
            <Button onClick={getToken}>Get Token</ Button>

            <div>version: 1.0.0</div>
            <div>State: {state}</div>
            <div>Token: {token}</div>
            <div>Errors: {JSON.stringify(error)}</div>

        </>
    )
}