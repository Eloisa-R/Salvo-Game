export function login(inputName,inputPwd){
    return function (dispatch){
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
            .then((response) => {
                console.log('Login response: o%', response);
                if (response.status === 200) {
                    console.log("yay");
                }
                else if (response.status === 406) {
                    console.log(response);
                }
            })
            .catch(error => {console.log(error)});
    }

}