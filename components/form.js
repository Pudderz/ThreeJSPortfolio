import { Button } from "@material-ui/core";
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
      <form
        onSubmit={this.handleSubmit}
        data-netlify="true"
        name="contact"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input type="hidden" name="form-name" value="contact" />

        <label htmlFor="name">Your Name:</label>
        <input
          id="name"
          type="text"
          name="formUsername"
          value={name}
          onChange={this.handleChange}
        />

        <label htmlFor="message">Your Email:</label>
        <input
          id="message"
          type="email"
          name="formEmail"
          value={email}
          onChange={this.handleChange}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="formMessage"
          value={message}
          onChange={this.handleChange}
        />

        <Button
          variant="contained"
          color="default"
          id="submitForm"
          type="submit"
          style={{ width: "fit-content", margin: "20px auto " }}
        >
          Send
        </Button>
      </form>
    );
  }
}
