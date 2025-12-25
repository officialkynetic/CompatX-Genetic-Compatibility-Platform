import React, { useState } from "react";
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactType: "general"
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        contactType: "general"
      });
    }, 1500);
  };

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-compatx text-white py-4">
              <h1 className="h3 mb-0">Contact CompatX</h1>
              <p className="mb-0 mt-2 opacity-75">
                Get in touch with our genetic compatibility experts
              </p>
            </Card.Header>
            
            <Card.Body className="p-4 p-md-5">
              {submitted ? (
                <Alert variant="success" className="text-center">
                  <h4 className="alert-heading">Message Sent Successfully!</h4>
                  <p>
                    Thank you for contacting CompatX. Our team will respond to your 
                    inquiry within 24-48 hours.
                  </p>
                  <hr />
                  <Button 
                    variant="outline-success" 
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </Alert>
              ) : (
                <Row>
                  <Col lg={7}>
                    <div className="mb-5">
                      <h2 className="h4 text-compatx mb-3">Send us a Message</h2>
                      <p>
                        Have questions about genetic compatibility? Need assistance with 
                        your profile? Our team of experts is here to help.
                      </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Your Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Subject *</Form.Label>
                        <Form.Select
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleChange}
                          required
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="medical">Medical Questions</option>
                          <option value="privacy">Privacy Concerns</option>
                          <option value="partnership">Partnership Opportunities</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>

                      {formData.contactType === "other" && (
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Please specify subject"
                          />
                        </Form.Group>
                      )}

                      <Form.Group className="mb-4">
                        <Form.Label>Your Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your inquiry..."
                          required
                        />
                      </Form.Group>

                      <Button 
                        variant="compatx" 
                        type="submit" 
                        className="w-100 py-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Sending Message...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </Form>
                  </Col>

                  <Col lg={5} className="mt-5 mt-lg-0">
                    <div className="bg-light p-4 rounded h-100">
                      <h3 className="h5 text-compatx mb-4">Contact Information</h3>
                      
                      <div className="mb-4">
                        <h4 className="h6 mb-2">Email Address</h4>
                        <p className="mb-0">
                          <a href="mailto:support@compatx.com" className="text-decoration-none">
                            support@compatx.com
                          </a>
                        </p>
                        <small className="text-muted">
                          General inquiries and support
                        </small>
                      </div>

                      <div className="mb-4">
                        <h4 className="h6 mb-2">Medical Questions</h4>
                        <p className="mb-0">
                          <a href="mailto:medical@compatx.com" className="text-decoration-none">
                            medical@compatx.com
                          </a>
                        </p>
                        <small className="text-muted">
                          For genetic counseling questions
                        </small>
                      </div>

                      <div className="mb-4">
                        <h4 className="h6 mb-2">Phone Support</h4>
                        <p className="mb-1">+234 800 000 0000</p>
                        <small className="text-muted">
                          Monday - Friday, 9AM - 5PM WAT
                        </small>
                      </div>

                      <div className="mb-4">
                        <h4 className="h6 mb-2">Office Address</h4>
                        <p className="mb-0">
                          123 Genetic Health Plaza<br />
                          Victoria Island<br />
                          Lagos, Nigeria
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-top">
                        <h4 className="h6 text-compatx mb-3">Quick Links</h4>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <Link to="/faq" className="text-decoration-none">
                              Frequently Asked Questions
                            </Link>
                          </li>
                          <li className="mb-2">
                            <Link to="/privacy" className="text-decoration-none">
                              Privacy Policy
                            </Link>
                          </li>
                          <li className="mb-2">
                            <Link to="/terms" className="text-decoration-none">
                              Terms of Service
                            </Link>
                          </li>
                          <li>
                            <Link to="/learn" className="text-decoration-none">
                              Genetics Guide
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}

              <div className="mt-5 text-center">
                <p className="mb-0">
                  <Link to="/" className="btn btn-outline-compatx">
                    Back to Home
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Contact;