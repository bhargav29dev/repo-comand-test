import { useState } from "react";
import useLocaleStorage from "../hooks/useLocaleStorage";

export default function Contact() {
  const [form, setForm] = useLocaleStorage("formdata", {
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend once a contact endpoint exists
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="page">
      <h1>Contact us</h1>
      <p>Have a question? Send us a message and we will get back to you.</p>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={onChange}
            required
          />
        </label>
        <button type="submit" className="btn primary">
          Send message
        </button>
        {sent && <p className="success">Thanks! Your message has been sent.</p>}
      </form>
    </section>
  );
}
