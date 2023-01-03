import { useState } from "react";

const FormComment = (props) => {
    const [comment, setComment] = useState({
        name: '',
        comment: ''
    });

    const onChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
        console.log(comment);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.addComment(e, comment);
        setComment({
            name: '',
            comment: ''
        });
    }

    return ( 
        <div className="form-comment">
            <form onSubmit={onSubmit}>
                <div className="form-comment-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={onChange}/>
                </div>
                <div className="form-comment-input">
                    <label htmlFor="comment">Commentaire</label>
                    <textarea name="comment" id="comment" cols="30" rows="10" onChange={onChange}></textarea>
                </div>
                <div className="form-comment-input">
                    <input type="submit" value="Envoyer" />
                </div>
            </form>
        </div>
     );
}
 
export default FormComment;