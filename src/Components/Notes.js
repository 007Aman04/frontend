import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/noteContext'
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext)
  const [note, setNote] = useState({id : "", etitle:"", edescription:"", etag:""})
  const { notes, getNotes, updateNote } = context

    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const editNote = (currentNote) => {
        ref.current.click()
        setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value })
      }
    
      const onClick = (e) => {
        console.log("Updating the note... ", note)
        refClose.current.click()
        console.log(typeof(note.id))
        updateNote({id : note.id, title : note.etitle, description : note.edescription, tag : note.etag})
        document.getElementById("etitle").value = ""
        document.getElementById("edescription").value = ""
        document.getElementById("etag").value = ""
        setNote({etitle:"", edescription:"", etag:""})
      }

    return (
        <>
            <div className="container">
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={onClick} >Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <h2>Your notes</h2>
                    {notes.map(_note => <NoteItem key={_note._id} editNote={editNote} note={_note} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Notes