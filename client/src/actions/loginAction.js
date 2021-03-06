import {fetchGames} from "../actions/gamesAction";

export function login(inputName,inputPwd){
    return function (dispatch){
        //in a cors request , you can't send application/json, only a few formats are allowed
        //hence, you have to send application/x-www-form-urlencoded data, which in this case
        //translates into a parameter string url-encoded.
        const body = "name=" + inputName + "&pwd=" + inputPwd;
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            body: body,
            mode: 'cors',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: "include"
        })
            .then(response =>  {if (response.ok) {
                console.log(response)
                return response.data;
            } else {
                throw new Error('Something went wrong, request failed with status ' + response.status);
                    }
            })
            .then((data) => {

                dispatch({type: "LOGIN_FULFILLED", logindata: data});
                dispatch(fetchGames());
            })
            .catch(error => {console.log(error)});

    }

}

export function singUp(inputFN, inputLN, inputUser, inputPwd){
    return function (dispatch){
        const body = "username=" + inputUser + "&firstname=" + inputFN + "&lastname=" + inputLN +"&password=" + inputPwd;
        fetch('http://localhost:8080/api/players', {
            method: 'POST',
            body: body,
            mode: 'cors',
            headers: {
                //the accept header specifies what format is acceptable for the server to send back
                //since what my server was returning didn't match the accept headers I sent, I had to accept all
                //in order to avoid a 406
                'Accept': '*/*',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: "include"
        })
            .then(response =>

            {if (response.ok) {
                return response.data;
            } else {
                throw new Error('Something went wrong, request failed with status ' + response.status);
            }
            })

            .then((data) => {dispatch({type: "SIGN_UP_FULFILLED", signUpdata:data})
                            dispatch(login(inputUser, inputPwd))
            })
            .catch(error => {console.log(error)});
    }

}

export function logOut(){
    return function(dispatch){
        fetch('http://localhost:8080/api/logout', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: "include"
        })
            .then(response =>

            {if (response.ok) {
                return response.data;
            } else {
                console.log(response);
                throw new Error('Something went wrong, request failed with status ' + response.status);
            }
            })

            .then((data) => {dispatch({type: "LOG_OUT_FULFILLED", logOutdata:data});
                dispatch(fetchGames());
            })
            .catch(error => {console.log(error)});
    }
}