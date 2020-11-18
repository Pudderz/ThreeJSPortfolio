import React from "react";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formUsername: "", formEmail: "", formMessage: "" };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = (e) => {
    console.log(encode({ "form-name": "contact", ...this.state }));
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message } = this.state;
    return (
      <form onSubmit={this.handleSubmit} data-netlify="true" name="contact">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name:
            <input
              type="text"
              name="formUsername"
              value={name}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Email:
            <input
              type="email"
              name="formEmail"
              value={email}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Message:
            <textarea
              name="formMessage"
              value={message}
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    );
  }
}
