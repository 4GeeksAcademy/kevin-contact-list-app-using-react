const API_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "kevin";

export const initialStore = () => {
  return {
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return { ...store, contacts: action.payload };

    case "add_contact":
      return { ...store, contacts: [...store.contacts, action.payload] };

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload),
      };

    default:
      return store;
  }
}

export async function createAgenda() {
  try {
    await fetch(`${API_URL}/agendas/${AGENDA_SLUG}`, { method: "POST" });
  } catch (err) {
    // Agenda may already exist, that's fine
  }
}

export async function fetchContacts(dispatch) {
  try {
    await createAgenda();
    const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`);
    if (!resp.ok) throw new Error("Failed to fetch contacts");
    const data = await resp.json();
    const contacts = (data.contacts || data).map((c) => ({ ...c, full_name: c.name }));
    dispatch({ type: "set_contacts", payload: contacts });
  } catch (err) {
    console.error("Error fetching contacts:", err);
  }
}

export async function createContact(dispatch, contact) {
  try {
    await createAgenda();
    const { full_name, ...rest } = contact;
    const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: full_name, ...rest }),
    });
    if (!resp.ok) {
      const errorData = await resp.text();
      console.error("API error:", resp.status, errorData);
      throw new Error("Failed to create contact");
    }
    const data = await resp.json();
    dispatch({ type: "add_contact", payload: { ...data, full_name: data.name } });
    return true;
  } catch (err) {
    console.error("Error creating contact:", err);
    return false;
  }
}

export async function updateContact(dispatch, id, contact) {
  try {
    const { full_name, ...rest } = contact;
    const resp = await fetch(
      `${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: full_name, ...rest }),
      }
    );
    if (!resp.ok) throw new Error("Failed to update contact");
    const data = await resp.json();
    dispatch({ type: "update_contact", payload: { ...data, full_name: data.name } });
    return true;
  } catch (err) {
    console.error("Error updating contact:", err);
    return false;
  }
}

export async function deleteContact(dispatch, id) {
  try {
    const resp = await fetch(
      `${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`,
      { method: "DELETE" }
    );
    if (!resp.ok) throw new Error("Failed to delete contact");
    dispatch({ type: "delete_contact", payload: id });
    return true;
  } catch (err) {
    console.error("Error deleting contact:", err);
    return false;
  }
}
