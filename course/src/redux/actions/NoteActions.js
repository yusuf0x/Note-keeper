import {
    NOTES_CREATE_FAIL,
    NOTES_CREATE_REQUEST,
    NOTES_CREATE_SUCCESS,
    NOTES_DELETE_FAIL,
    NOTES_DELETE_REQUEST,
    NOTES_DELETE_SUCCESS,
    NOTES_LIST_FAIL,
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS,
    NOTES_UPDATE_FAIL,
    NOTES_UPDATE_REQUEST,
    NOTES_UPDATE_SUCCESS,
  } from "../types/Types";

  import axios from "axios";

export const ListNotes = () => {
    return async (dispatch,getState) => {
      try{
        dispatch({type: NOTES_LIST_REQUEST});

        const {userInfo} = getState().UserLogin;
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          `http://127.0.0.1:8800/api/notes`, 
          config
        );
        
        dispatch({
          type: NOTES_LIST_SUCCESS,
          payload: data,
        });
      }catch(error){
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
         dispatch({
            type: NOTES_LIST_FAIL,
            payload: message,
        });
      }
    }
  };
  export const CreateNoteAction = (title,content,category) => {
    return async (dispatch,getState) => {
      try{
        dispatch({type: NOTES_CREATE_REQUEST});
        const {userInfo} = getState().UserLogin;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          `http://127.0.0.1:8800/api/notes/create`,
          { title, content, category},
          config
        );
        dispatch({
          type: NOTES_CREATE_SUCCESS,
          payload: data,
        });
      }catch(error){
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          dispatch({
            type: NOTES_CREATE_FAIL,
            payload: message,
          });
      }
    }
  };
  //
  export const DeleteNoteAction = (id) => {
    return async (dispatch,getState) => {
      try{
        dispatch({type: NOTES_DELETE_REQUEST});
        const {userInfo} = getState().UserLogin;
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.delete(
          `http://127.0.0.1:8800/api/notes/${id}`,
          config
        );
        dispatch({
          type: NOTES_DELETE_SUCCESS,
          payload: data,
        });
      }catch(error){
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          dispatch({
            type: NOTES_DELETE_FAIL,
            payload: message,
          });
      }
    }
  };
  //
  export const UpdateNoteAction = (id,title,content,category) => {
    return async (dispatch,getState) => {
      try{
        dispatch({type: NOTES_UPDATE_REQUEST});
        const {userInfo} = getState().UserLogin;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.put(
          `http://127.0.0.1:8800/api/notes/${id}`,
          {title,content,category},
          config
        );
        dispatch({
          type: NOTES_UPDATE_SUCCESS,
          payload: data,
        });
      }catch(error){
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          dispatch({
            type: NOTES_UPDATE_FAIL,
            payload: message,
          });
      }
    }
  };