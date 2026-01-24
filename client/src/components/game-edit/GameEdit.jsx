
import { useNavigate, useParams } from "react-router-dom";
import { useEditGame, useOneGame } from "../../api/gameApi";

export default function GameEdit() {
    const { gameId } = useParams();           // Always get gameId first
    const { game } = useOneGame(gameId);      // Fetch the game data
    const navigate = useNavigate();
    const { edit } = useEditGame();

    // Wait until game is loaded
    if (!game || !game.title) {
        return <p>Loading game data...</p>;
    }

    const formAction = async (formData) => {
        const gameData = Object.fromEntries(formData);
        await edit(gameId, gameData);          // Send edit request
        navigate(`/games/${gameId}/details`);  // Redirect to game details
    };

    return (
        <section id="edit-page" className="auth">
            <form 
                id="edit"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    await formAction(formData);
                }}
            >
                <div className="container">
                    <h1>Edit Game</h1>

                    <label htmlFor="title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={game.title || ''}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        defaultValue={game.category || ''}
                    />

                    <label htmlFor="maxLevel">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        defaultValue={game.maxLevel || 1}
                    />

                    <label htmlFor="imageUrl">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        defaultValue={game.imageUrl || ''}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        id="summary"
                        name="summary"
                        defaultValue={game.summary || ''}
                    />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Edit Game"
                    />
                </div>
            </form>
        </section>
    );
}