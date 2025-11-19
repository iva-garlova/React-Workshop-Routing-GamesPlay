import commentServise from "../../services/commentServise";

export default function CommentsAdd({
    email,
    gameId, 
}) {

    const commentAction = async(formData) => {
     const comment = formData.get('comment');

     const createdComment = await commentServise.create(email, gameId, comment);
     console.log(createdComment);
     


     
    }
    return (
        //    {/* <!-- Bonus -->
            // <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" action={commentAction}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment"/>
                </form>
            </article>

    );
}