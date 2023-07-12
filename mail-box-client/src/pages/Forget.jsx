import React, { useRef, useState } from "react";
import { authKey } from "../utils/autKey/api";
import { Watch } from "react-loader-spinner";
import { Button, Card, InputGroup, Form } from "react-bootstrap";

import axios from "axios";
function Forget() {
  const [loader, setLoader] = useState(false);
  const emailRef = useRef();
  const ForgetHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const email = emailRef.current.value;
    console.log(email);
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${authKey}`,
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );

      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  return (
    <>
      <Card className=" p-2 mx-auto text-center col-md-6 col-lg-4 mt-5">
        <Card.Header>{"Forget Password"}</Card.Header>
        <Card.Body>
          <Form>
            <InputGroup className="mb-3 w-75 mx-auto">
              <Form.Control
                placeholder="Email"
                required
                ref={emailRef}
                type="email"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <Button variant="success" onClick={ForgetHandler} type={"submit"}>
              {loader ? (
                <Watch
                  height="25"
                  width="25"
                  radius="48"
                  color="white"
                  ariaLabel="watch-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "submit"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Forget;
