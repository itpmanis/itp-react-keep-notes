import React, { useEffect, useState } from "react";

const TextField = () => {
  const [note, setNote] = useState("");
  const [noteList, setNoteList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [noteindex, setNoteindex] = useState("");
  const [deleted, setDeleted] = useState([]);

  console.log(deleted, "hey dell");

  const handleChange = (event) => {
    setNote(event.target.value);
  };
  const handleCreate = () => {
    let trimmed = note.trim();
    if (trimmed !== "") {
      let newNote = { note };
      let combineNote = [...noteList, newNote];
      setNoteList(combineNote);
      setNote("");
    }
  };

  const handleEdit = (index) => {
    let data = [...noteList];
    data = data[index];
    setNote(data.note);
    setEditing(true);
    setNoteindex(index);
  };

  const handleDelete = (index) => {
    let data = [...noteList];
    let del = data.splice(index, 1)[0]; // Access the deleted note at index 0
    let newDel = [...deleted, del];
    setNoteList(data);
    setDeleted(newDel);
  };

  const handleUpdate = () => {
    let copy = [...noteList];
    copy[noteindex].note = note;
    setNoteList(copy);
    setEditing(false);
    setNote("");
  };

  useEffect(() => {
    let data = localStorage.getItem("noteList");
    let del = localStorage.getItem("deleted");
    if (data) {
      setNoteList(JSON.parse(data));
    }
    if (del) {
      setDeleted(JSON.parse(del));
    }
  }, []);

  


  useEffect(()=>{
localStorage.setItem("noteList",JSON.stringify(noteList))
localStorage.setItem("deleted",JSON.stringify(deleted))
  },[noteList,deleted])

  return (
    <>
      <div className="d-flex justify-content-center w-100vw h-100vh my-lg-5">
        <div className="d-flex flex-column justify-content-center ">
          <textarea
            className="form-control form-control-lg mb-2"
            rows="4"
            cols="60"
            placeholder="Enter your text"
            value={note}
            onChange={handleChange}
          />

          {editing === true ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleCreate}
            >
              Create
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {noteList.length === 0 ? (
          ""
        ) : (
          <>
            <div className="col-6 col-lg-5 mx-auto">
              <h4 className=" p-3"> Note List</h4>

              <div
                className="m-3 p-3"
                style={{
                  height: "45vh",
                  overflowY: "scroll",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  borderRadius: "8px",
                }}
              >
                {noteList.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="card text-white  mb-3"
                      style={{ marginBottom: "15px" }}
                    >
                      <div className="card-body bg-secondary">
                        <p className="card-text">{data.note}</p>
                      </div>
                      <div className="card-header d-flex justify-content-center">
                        <button
                          className="btn btn-success"
                          style={{
                            width: "50%",
                            color: "white",
                            marginRight: 2,
                          }}
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{
                            width: "50%",
                            color: "white",
                            marginLeft: 2,
                          }}
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {deleted.length === 0 ? (
          ""
        ) : (
          <>
            <div className="col-6 col-lg-5 mx-auto">
              <h4 className=" p-3">Deleted notes</h4>

              <div
                className="m-3 p-3"
                style={{
                  height: "45vh",
                  overflowY: "scroll",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  borderRadius: "8px",
                }}
              >
                {deleted.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="card text-white  mb-3"
                      style={{ marginBottom: "15px" }}
                    >
                      <div className="card-body bg-danger">
                        <p className="card-text">{data.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TextField;
