import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="card contact-card mb-3">
      <div className="card-body d-flex align-items-center">
        <div className="contact-avatar me-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.full_name)}&size=80&background=random`}
            alt={contact.full_name}
            className="rounded-circle"
            width="80"
            height="80"
          />
        </div>
        <div className="flex-grow-1">
          <h5 className="card-title mb-1">{contact.full_name}</h5>
          {contact.address && (
            <p className="card-text text-muted mb-0">
              <i className="fas fa-map-marker-alt me-2"></i>
              {contact.address}
            </p>
          )}
          {contact.phone && (
            <p className="card-text text-muted mb-0">
              <i className="fas fa-phone me-2"></i>
              {contact.phone}
            </p>
          )}
          {contact.email && (
            <p className="card-text text-muted mb-0">
              <i className="fas fa-envelope me-2"></i>
              {contact.email}
            </p>
          )}
        </div>
        <div className="d-flex">
          <Link
            to={`/edit-contact/${contact.id}`}
            className="btn btn-outline-secondary btn-sm me-2"
            title="Edit"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(contact)}
            title="Delete"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
