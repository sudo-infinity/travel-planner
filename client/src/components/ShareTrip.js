import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { shareTrip } from "../api/trips";
import { listSharings } from "../api/trips";
import { removeAcess } from "../api/trips";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");


const ShareTrip = ({ tripId }) => {
  console.log(tripId);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ users, setUsers ] = useState();
  const [formState, setFormState] = useState({
    trip_id: tripId ,
    userName: "",
    permissions: "view"
  });



  useEffect(() => {
    const thisComponentData = async () => {
      const sharings = await listSharings(tripId);
      var usersArray = [];
      sharings.map((sharing) => {
        usersArray.push(sharing.user_id);
      });
      setUsers(usersArray);
    };
    thisComponentData();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleShare = async () => {
    try {
      await shareTrip(formState);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAccess = async (userId) => {
    try {
      window.location.reload();
      await removeAcess(userId,tripId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
      setFormState((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
  };

  const resetValidation = (e) => {
    e.target.classList.remove("is-invalid");
    e.target.classList.remove("is-valid");
  };

  const validation = (e) => {
    if (e.target.value === "") {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.add("is-valid");
    }
  };

  return (
  <span className="mx-2">
    <FontAwesomeIcon
          className="btn btn-outline-dark"
          icon={faShare}
          onClick={openModal}
        />

  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Edit trip"
    style={customStyles}
  >
    <div className="row justify-content-md-center">
      <div className="col-m-12 text-center m-4">
        <div className="col-m-12 m-4">
          <h1>Share Trip</h1>
        </div>
        <form className="flex-row justify-center justify-space-between-md align-center">
          <div className="form-group pb-2">
              <label htmlFor="name">Who to share it with?</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                placeholder="Enter username here"
                value={formState.userName}
                onChange={handleChange}
                onFocus={resetValidation}
                onBlur={validation}
              />
              <div className="valid-feedback">Looks Good</div>
              <div className="invalid-feedback">
                Hey! Get back here.. This field is required.
              </div>
          </div>
          <div className="form-group pb-2">
              <label htmlFor="name">Access Level</label>
              <select className="form-control" name="permissions" value={formState.permissions} onChange={handleChange}>
                <option name="edit" value="edit">Edit</option>
                <option name="view" value="view">View</option>
              </select>
              <div className="valid-feedback">Looks Good</div>
              <div className="invalid-feedback">
                Hey! Get back here.. This field is required.
              </div>
          </div>

         
          <div>
          <button className="btn btn-primary m-4" onClick={() => handleShare()}>
              Share this Trip
            </button>
          </div>
        </form>

        {/* here is the access list part */}

        <div
          className="card my-3 border-success"
          style={{height: "300px"}}
        >
          <div className="card-body">
            <h5 className="card-title">Here is the list of people that have access to this trip:</h5>
            <ul className="list-group list-group-flush">
              {users?.map((user) => (
                <li className="list-group-item" 
                    style={{height: "110px",
                    overflowX: "hidden",
                    overflowY: "auto",
                    textAlign:"justify",}}>
                      <span className="mx-2"> {user.username} </span>
                      <span className="mx-2">
                      <FontAwesomeIcon
                        className="btn btn-outline-danger"
                        icon={faTrashCan}
                        onClick={() => handleDeleteAccess(user._id)}
                      />
                      </span>
              </li>
              
              ))}
              
            </ul>
          </div>
        </div>

        <button className="btn btn-outline-danger" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  </Modal>
  </span>
  );
};

export default ShareTrip;
