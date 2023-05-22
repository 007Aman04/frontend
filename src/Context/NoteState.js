import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        const response = await fetch("https://backend-qpk5.onrender.com/api/notes/fetchallnotes", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdjNzNjYjU3MjE4ZTc4ZmZjODdhMCIsImlhdCI6MTY4MDU5NjExN30.qdNtXmfY0U6KazJ2Zty6WDl7P91rwZ-OtwHfZARS3Bw"
            },
          });
          const json = await response.json()
          setNotes(json.notes)
    }

    const addNote = async ({title, description, tag}) => {
        const response = await fetch("https://backend-qpk5.onrender.com/api/notes/addnote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdjNzNjYjU3MjE4ZTc4ZmZjODdhMCIsImlhdCI6MTY4MDU5NjExN30.qdNtXmfY0U6KazJ2Zty6WDl7P91rwZ-OtwHfZARS3Bw"
            },
            body: JSON.stringify({title, description, tag})
          });
        const {_id, user, date} = (response.json())
        const note = {
            "_id": _id,
            "user": user,
            "title": title,
            "description": description,
            "tag": tag,
            "date": date,
            "__v": 0
        }

        setNotes(notes.concat(note))

    }

    const deleteNote = async (id) => {
      console.log(id);
        await fetch(`https://backend-qpk5.onrender.com/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdjNzNjYjU3MjE4ZTc4ZmZjODdhMCIsImlhdCI6MTY4MDU5NjExN30.qdNtXmfY0U6KazJ2Zty6WDl7P91rwZ-OtwHfZARS3Bw"
            },
          });
        const newNotes = notes.filter(note => note._id !== id)
        setNotes(newNotes)
    }

    const updateNote = async ({id, title, description, tag}) => {
        console.log(id)
        await fetch(`https://backend-qpk5.onrender.com/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdjNzNjYjU3MjE4ZTc4ZmZjODdhMCIsImlhdCI6MTY4MDU5NjExN30.qdNtXmfY0U6KazJ2Zty6WDl7P91rwZ-OtwHfZARS3Bw"
            },
            body: JSON.stringify({title, description, tag})
          });
        
          const newNotes = notes.map(note => {
            if(note._id === id){
                note.title = title
                note.description = description
                note.tag = tag
            }
            return note
          })
        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState