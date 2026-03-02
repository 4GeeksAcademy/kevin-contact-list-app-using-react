import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../store";

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const isEditing = !!id;

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isEditing) {
      const existing = store.contacts.find((c) => c.id === parseInt(id));
      if (existing) {
        setForm({
          full_name: existing.full_name || "",
          email: existing.email || "",
          phone: existing.phone || "",
          address: existing.address || "",
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (isEditing) {
      success = await updateContact(dispatch, parseInt(id), form);
    } else {
      success = await createContact(dispatch, form);
    }
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <h1>{isEditing ? "Edit Contact" : "Add New Contact"}</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            name="full_name"
            placeholder="Enter full name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Contact" : "Save Contact"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
