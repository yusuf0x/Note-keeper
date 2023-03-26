import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteNoteAction } from "../redux/actions/NoteActions";

const NoteCard = ({myKey,note}) => {
    const dispatch = useDispatch();
    const noteDelete = useSelector((state) => state.NoteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;
    const noteUpdate = useSelector((state) => state.NoteUpdate);
    const { success: successUpdate } = noteUpdate;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(DeleteNoteAction(id));
        }
    }
    useEffect(() =>{

    },[dispatch, successDelete,successUpdate]);
    return (
    <Card  key={myKey} className="mb-4">
        <Card.Header>
            <div className="d-flex justify-content-between" >
            {note.title}
            <div className="d-flex justify-content">
                <Button href={`/note/${note._id}`} variant="primary" className="mx-1">Edit</Button>
                <Button onClick={() => deleteHandler(note._id)} variant="danger" className="mx-1">Delete</Button>
            </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {note.content}
            </Card.Text>
            <Card.Title>{note.category}</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted">
              Updated on -{note.updatedAt.substring(0, 10)}
        </Card.Footer>
    </Card>
    )
}
export default NoteCard;