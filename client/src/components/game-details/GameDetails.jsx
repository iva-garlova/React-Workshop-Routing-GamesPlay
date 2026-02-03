import { useEffect, useState } from 'react';
import { Link } from 'react-router'
import { useNavigate, useParams } from 'react-router'
import CommentsShow from '../commentsShow/CommentsShow';
import CommentsAdd from '../commentsAdd/CommentsAdd';
import commentServise from '../../services/commentServise';
import { useDelete, useOneGame } from '../../api/gameApi.js';
import useAuth from '../../hooks/useAuth.js';

export default function GameDetails() {
    const navigate = useNavigate();
    const { email, _id: userId } = useAuth();
    const [comments, setComments] = useState([]);
    const {gameId} = useParams();
    const {game} = useOneGame(gameId);
    const { deleteGame } = useDelete();


    useEffect(() =>{
      commentServise.getAll(gameId)
      .then(setComments)
    }, [gameId]);

    const gameDeletelickHandler = async () =>{
    const hasConfirmed = confirm(`Are you sure you want to delete ${game.title} game?`);
    
    if(!hasConfirmed){
     return;
    };
    await deleteGame(gameId);


    navigate('/games')

    };
    const commentsCreateHandler = (newComment) => {
    setComments(state => [...state, newComment]);
    };

    const isOwner = userId === game._ownerId;

    return (
         <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

               <CommentsShow comments={comments}/>
{/* 
                <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && (

                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <button 
                    onClick={gameDeletelickHandler} 
                    className="button">
                        Delete
                    </button>
                </div>
                )}
            </div>

          <CommentsAdd 
          email={email} 
          gameId={gameId}
          onCreate={commentsCreateHandler}/>
        </section>
    );
}