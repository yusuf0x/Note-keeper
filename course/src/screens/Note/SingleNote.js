import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
 import axios  from "axios";
import { DeleteNoteAction, UpdateNoteAction } from "../../redux/actions/NoteActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const SingleNote = ( ) => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const noteId = location.pathname.split("/")[2];
    console.log(noteId);
    const dispatch = useDispatch();
    const noteUpdate = useSelector((state) => state.NoteUpdate);
    const { loading, error } = noteUpdate;
    const noteDelete = useSelector((state) => state.NoteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;
    const userLogin = useSelector((state)=>state.UserLogin);
    const {loading:loadingUser,error:ErrorUser,userInfo} = userLogin;

    const deleteHandler = (id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(DeleteNoteAction(id));
      }
      navigate("/mynotes");
    };
    
    const resetHandler = () => {
      setTitle("");
      setCategory("");
      setContent("");
    };

    useEffect(() => {
      if(!userInfo){
        navigate("/login");
      }else{
        const fetching = async () => {
          const { data } = await axios.get(`http://127.0.0.1:8800/api/notes/${noteId}`);  
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setDate(data.updatedAt);
        };
        fetching();
      }
    }, [noteId, date,userInfo]);

    const updateHandler = (e) => {
      e.preventDefault();
      dispatch(UpdateNoteAction(noteId, title, content, category));
      if (!title || !content || !category) return;
      resetHandler();
      navigate("/mynotes");
    }
    return (
        <MainScreen title="Edit Note">
          <Card>
            <Card.Header>Edit your Note</Card.Header>
            <Card.Body>
              <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
    
                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter the content"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>
                {content && (
                  <Card>
                    <Card.Header>Note Preview</Card.Header>
                    <Card.Body>
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </Card.Body>
                  </Card>
                )}
    
                <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="content"
                    placeholder="Enter the Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                {loading && <Loading size={50} />}
                <Button variant="primary" type="submit">
                  Update Note
                </Button>
                <Button
                  onClick={() => deleteHandler(noteId)}
                  className="mx-2"
                  variant="danger">
                  Delete Note
                </Button>
              </Form>
            </Card.Body>
    
            <Card.Footer className="text-muted">
              Updated on - {date.substring(0, 10)}
            </Card.Footer>
          </Card>
        </MainScreen>
    )
}
export default SingleNote;