import { useEffect, useState } from 'react';
import { Link } from 'react-router'
import { useNavigate, useParams } from 'react-router'
import gameServise from '../../services/gameServise';
import CommentsShow from '../commentsShow/CommentsShow';
import CommentsAdd from '../commentsAdd/CommentsAdd';
import commentServise from '../../services/commentServise';

export default function GameDetails({
    email,
}) {
    const navigate = useNavigate();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const {gameId} = useParams();

    useEffect(() =>{
      gameServise.getOne(gameId)
      .then(setGame);

      commentServise.getAll(gameId)
      .then(setComments)
    }, [gameId]);

    const gameDeletelickHandler = async () =>{
    const hasConfirmed = confirm(`Are you sure you want to delete ${game.title} game?`);
    
    if(!hasConfirmed){
     return;
    };
    await gameServise.delete(gameId);
    navigate('/games')

    };
    const commentsCreateHandler = (newComment) => {
    setComments(state => [...state, newComment]);
    }

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
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <button 
                    onClick={gameDeletelickHandler} 
                    className="button">
                        Delete
                    </button>
                </div>
            </div>

          <CommentsAdd 
          email={email} 
          gameId={gameId}
          onCreate={commentsCreateHandler}/>
        </section>
    );
}