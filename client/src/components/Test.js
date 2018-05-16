import React from 'react';


class Test extends React.Component{

    testCall(){
        fetch('http://localhost:8080/login', {headers: {'Access-Control-Allow-Origin':'*',  name: "j.bauer@ctu.gov", pwd: "24"}})
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
    }

    componentDidMount(){
        this.testCall();
    }

    render() {
        return (
            <div className="test-container">

            </div>
        );
    }
}

export default Test;
