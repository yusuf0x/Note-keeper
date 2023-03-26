import { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
// import NoteCard from "../../components/NoteCard";
import {DeleteNoteAction, ListNotes} from '../../redux/actions/NoteActions';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
    const dispatch = useDispatch();
    const noteList = useSelector((state) => state.NoteList);
    const {loading,error,notes} = noteList;

    const userLogin = useSelector((state) => state.UserLogin);
    const { userInfo } =userLogin;
    const navigate = useNavigate();

    const noteDelete = useSelector((state) => state.NoteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;
    const noteUpdate = useSelector((state) => state.NoteUpdate);
    const { success: successUpdate } = noteUpdate;
    const noteCreate = useSelector((state) => state.NoteCreate);
    const { success: successCreate } = noteCreate;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(DeleteNoteAction(id));
        }
    }



    useEffect(()=>{
        dispatch(ListNotes());
        if(!userInfo){
            navigate("/");
        }
    },[dispatch,
        navigate,
        userInfo,
        successDelete,
        successCreate,
        successUpdate]);

        




        

    return (

       <Container className="mt-5">
             <Link to="/createnote">
                <Button className="mb-3" style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create new Note
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loading && <Loading />}
            {loadingDelete && <Loading />}
            {notes && notes.map((note,index) => {
                return (
                    // <NoteCard  myKey={index} note={note}/>
                 <Card  key={index} className="mb-4">
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
            })}
          
       </Container>
    )
}
export default MyNotes;