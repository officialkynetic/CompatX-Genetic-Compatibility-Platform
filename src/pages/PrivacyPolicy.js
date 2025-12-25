import React from "react";
import { Container, Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-compatx text-white py-4">
          <h1 className="h3 mb-0">Privacy Policy</h1>
          <p className="mb-0 mt-2 opacity-75">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </Card.Header>
        
        <Card.Body className="p-4 p-md-5">
          <div className="mb-5">
            <h2 className="h4 text-compatx mb-3">Welcome to CompatX</h2>
            <p className="lead">
              Your privacy is important to us. This Privacy Policy explains how CompatX collects, 
              uses, discloses, and safeguards your information when you use our genetic compatibility 
              checking service.
            </p>
          </div>

          <Accordion defaultActiveKey="0" className="mb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h3 className="h5 mb-0">1. Information We Collect</h3>
              </Accordion.Header>
              <Accordion.Body>
                <h4 className="h6 mt-3">Personal Information</h4>
                <ul>
                  <li>Name and contact information (email address)</li>
                  <li>Account credentials</li>
                  <li>Demographic information (age, gender)</li>
                </ul>

                <h4 className="h6 mt-3">Health Information</h4>
                <ul>
                  <li>Blood type and genotype information</li>
                  <li>Medical history (allergies, medications)</li>
                  <li>Genetic compatibility data</li>
                </ul>

                <h4 className="h6 mt-3">Technical Information</h4>
                <ul>
                  <li>Device information and IP address</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h3 className="h5 mb-0">2. How We Use Your Information</h3>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>To provide and maintain our genetic compatibility services</li>
                  <li>To create and manage your user account</li>
                  <li>To process your health profile information</li>
                  <li>To generate compatibility reports</li>
                  <li>To communicate with you about service updates</li>
                  <li>To improve our services and user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h3 className="h5 mb-0">3. Data Security</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information, including:
                </p>
                <ul>
                  <li>Encryption of sensitive health data</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Data backup and recovery procedures</li>
                </ul>
                <p className="mt-3">
                  While we strive to protect your information, no electronic transmission or storage 
                  method is 100% secure.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h3 className="h5 mb-0">4. Data Sharing and Disclosure</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>We do not sell your personal or health information. We may share information with:</p>
                <ul>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Legal authorities when required by law</li>
                  <li>Healthcare professionals with your explicit consent</li>
                  <li>Academic researchers in anonymized, aggregated form</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <h3 className="h5 mb-0">5. Your Rights and Choices</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Export your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:privacy@compatx.com" className="text-decoration-none">
                    privacy@compatx.com
                  </a>
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="mt-5 p-4 bg-light rounded">
            <h3 className="h5 text-compatx mb-3">Contact Information</h3>
            <p className="mb-2">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-unstyled">
              <li>Email: <a href="mailto:privacy@compatx.com" className="text-decoration-none">privacy@compatx.com</a></li>
              <li>Address: CompatX Privacy Office, Lagos, Nigeria</li>
              <li>Phone: +234 800 000 0000</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <p className="mb-0">
              <Link to="/" className="btn btn-outline-compatx">
                Back to Home
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;