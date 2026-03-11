import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchContacts, deleteContact } from "../store";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContacts(dispatch);
  }, []);

  const handleDelete = async () => {
    if (contactToDelete) {
      await deleteContact(dispatch, contactToDelete.id);
      setContactToDelete(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Contacts</h1>
      </div>

      {store.contacts.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="fas fa-address-book text-muted"
            style={{ fontSize: "4rem" }}
          ></i>
          <p className="text-muted mt-3">
            No contacts yet. Add your first contact!
          </p>
        </div>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={setContactToDelete}
          />
        ))
      )}

      {/* Delete Confirmation Modal */}
      {contactToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setContactToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{contactToDelete.full_name}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setContactToDelete(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
