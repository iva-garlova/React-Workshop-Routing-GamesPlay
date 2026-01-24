import {  useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";


const baseUrl = 'http://localhost:3030/data/games';

export default {
    //  create(gameData) {
    //     return request.post(baseUrl, gameData);
     
    // },
    // async getAll() {
    //     const  result = await request.get(baseUrl);
    //     const games = Object.values(result);
    //     return games;
    // },
    // getOne(gameId) {
    //  return request.get(`${baseUrl}/${gameId}`);
    // },
    delete(gameId){
        return request.delete(`${baseUrl}/${gameId}`);
    },
    edit(gameId, gameData){
 return request.put(`${baseUrl}/${gameId}`, {...gameData, _id: gameId})
    }
};


export const useGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
         request.get(baseUrl)
         .then(setGames);
    }, []);

    return { games };

};

export const userCreateGame = () => {
    const { options } = useAuth();


    const create = (gameData) => 
          request.post(baseUrl, gameData, options);
    
    return { create }
};

export const useOneGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${gameId}`)
        .then(setGame);
    }, [gameId]);

    return { game };
};

export const useEditGame = () => {

}