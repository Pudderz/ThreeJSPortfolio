import { Button } from "@material-ui/core";
import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    width: "fit-content",
    display:'inline-block',
    marginLeft: 0,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    "& svg": {
      height: "100%",
      width: "100%",
      bottom: 0,
    },
  },
  formInputs: {
    fontFamily: "unset",
    outline: "none",
    padding: "1px",
    fontSize: "16px",
  },
  successMessage:{
    color: green[500],
    display:'inline-block',
    width:'fit-content',
    paddingLeft:'30px',
  }
}));

export default function ContactForm() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [form, setForm] = React.useState({
    formUsername: "",
    formEmail: "",
    formMessage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      })
        .then(() => {
          // setSuccess(true);
          // setLoading(false);
          setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            setForm({
              formUsername: "",
              formEmail: "",
              formMessage: "",
            });
          }, 500);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    if (!loading) {
      if(success){
        setSuccess(false);
      }
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
      <div className="form">
        <h2>Contact Form</h2>

        <hr />
        <form
          onSubmit={handleSubmit}
          data-netlify="true"
          name="contact"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input type="hidden" name="form-name" value="contact" required />
          
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="formUsername"
            value={form.formUsername}
            onChange={handleChange}
            onKeyDown={handleChange}
            className={classes.formInputs}
            placeholder="Name"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="formEmail"
            value={form.formEmail}
            onChange={handleChange}
            onKeyDown={handleChange}
            className={classes.formInputs}
            placeholder="Email"
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            required
            id="message"
            name="formMessage"
            value={form.formMessage}
            className={classes.formInputs}
            onChange={handleChange}
            onKeyDown={handleChange}
            style={{
              resize: "vertical",
              minHeight: "75px",
              maxHeight: "500px",
            }}
            placeholder="Message"
          />
          <div className={classes.wrapper}>
          
            <Button
              variant="contained"
              color="default"
              id="submitForm"
              type="submit"
              disabled={loading}
              style={{ width: "fit-content" }}
            >
              Send
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          {success && (
                        <p className={classes.successMessage}>Message sent</p>
                      )}
          
          </div>
          
        </form>
      </div>
  );
}
