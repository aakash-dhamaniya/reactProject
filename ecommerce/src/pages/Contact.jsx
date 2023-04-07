import { useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Contact() {
  const name = useRef("");
  const contact = useRef("");
  const email = useRef("");
  async function submitHandler(e) {
    e.preventDefault();
    console.log(name);
    const contactDetails = {
      name: name.current.value,
      email: email.current.value,
      contact: contact.current.value,
    };
    try {
      const response = await fetch(
        "https://react-http-5a75d-default-rtdb.asia-southeast1.firebasedatabase.app/contact.json",
        {
          method: "POST",
          body: JSON.stringify(contactDetails),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
    name.current.value = "";
    contact.current.value = "";
    email.current.value = "";
    alert("submit successfully");
  }
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Name" ref={name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="contact">
          <Form.Label>Contact No:</Form.Label>
          <Form.Control
            type="number"
            placeholder="phone number"
            ref={contact}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
