import { useEffect, useState } from "react"
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";

export const Games = () => {
    const[gamesData, setGamesData] = useState({
        title:"",
        creator:"",
        type:"",
        price:"",
    });
    
    const[games, setGames] = useState([])
    //const[page, setPage] = useState(1)

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get("http://localhost:3001/games")
        .then((res) => {
            setGames(res.data)
        })
    }

    const handleChanges = (e) => {
        const{id,value} = e.target;
        setGamesData({
            ...gamesData,
            [id]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/games",gamesData)
        .then(() => {
            alert("user registered sucessfully");
            getData()
            setGamesData({
                title:"",
                creator:"",
                type:"",
                price:"",
            })
        })
        
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <h1>GAMING WORLD</h1>
            <input
            value={gamesData.title}
            id="title" 
            type="text"
            onChange={handleChanges}
            placeholder="Enter game's name" 
            />
             
            <input
            value={gamesData.creator}
            id="creator" 
            type="text"
            onChange={handleChanges}
            placeholder="Enter game's creator name" 
            />
             
            <input
            value={gamesData.type}
            id="type" 
            type="text"
            onChange={handleChanges}
            placeholder="Enter game's type" 
            />
             
            <input
            value={gamesData.price}
            id="price" 
            type="text"
            onChange={handleChanges}
            placeholder="Enter game's price" 
            />
            {games.map((g) => (
                <div key={g.id}>{g.title}, age :{g.creator}, address:{g.type}, department: {g.price}</div>
            ))}

            <input type="submit" value="Submit your data" />
        </form>
    )
}