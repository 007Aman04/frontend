import React, {useContext} from 'react'
import noteContext from '../Context/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context

    return (
        <>
            <div className="col-md-3">
                <div className="card my-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{props.note.title}</h5>
                            <i className="fa-regular fa-pen-to-square mx-2" style={{cursor : "pointer"}} onClick={() => props.editNote(props.note)} />
                            <i className="fa-solid fa-trash-can mx-1" style={{cursor : "pointer"}} onClick={() => {deleteNote(props.note._id)}} />
                        </div>
                        <p className="card-text">{props.note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem