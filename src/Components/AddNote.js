import React, {useContext, useState} from 'react'
import noteContext from '../Context/noteContext'

const AddNote = () => {
  const context = useContext(noteContext)
  const [note, setNote] = useState({title:"", description:"", tag:""})
  const {addNote} = context

  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value })
  }

  const onClick = (e) => {
    e.preventDefault()
    addNote(note)
    document.getElementById("title").value = ""
    document.getElementById("description").value = ""
    document.getElementById("tag").value = ""
    setNote({title:"", description:"", tag:""})
  }

  return (
    <>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={onClick} >Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddNote