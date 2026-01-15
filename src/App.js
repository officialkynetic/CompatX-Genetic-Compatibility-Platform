import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  NavDropdown,
  Button,
} from "react-bootstrap";
import "./App.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import CompatibilityChecker from "./pages/CompatXChecker";
import LearnMore from "./pages/LearnMore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";

function Home() {
  return (
    <Container className="py-5">
      <div className="card shadow-lg border-0 p-5 text-center">
        <h1 className="display-4 fw-bold text-primary mb-4">
          Welcome to CompatX
        </h1>
        <p className="lead text-muted mb-4">
          A smart tool to help you understand genetic compatibility for
          healthier relationships and prevent conditions like sickle cell
          disease. Make informed decisions about your health and relationships.
        </p>
        <div className="mt-5">
          <h3 className="mb-4">Ready to Get Started?</h3>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
            <Link to="/dashboard" className="btn btn-primary btn-lg px-5 py-3">
              Create Your Profile
            </Link>
            <Link
              to="/compatibility"
              className="btn btn-success btn-lg px-5 py-3"
            >
              Check Compatibility
            </Link>
            <Link to="/learn" className="btn btn-info btn-lg px-5 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleCloseMobileMenu = () => setShowMobileMenu(false);
  const handleShowMobileMenu = () => setShowMobileMenu(true);

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
          <Container>
            {/* Mobile Hamburger Button - Left side for mobile */}
            <Button
              variant="outline-light"
              onClick={handleShowMobileMenu}
              className="d-lg-none me-3 border-0` hamburger-btn"
              style={{ background: "transparent" }}
            >
              <span className="navbar-toggler-icon"></span>
            </Button>

            {/* Brand/Logo */}
            <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
              CompatX
            </Navbar.Brand>

            {/* Desktop Navigation (shows on lg screens and up) */}
            <Navbar.Collapse
              id="desktop-navbar-nav"
              className="d-none d-lg-flex"
            >
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="mx-2 fw-semibold">
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className="mx-2 fw-semibold"
                >
                  My Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/compatibility"
                  className="mx-2 fw-semibold"
                >
                  Compatibility Check
                </Nav.Link>
                <NavDropdown
                  title="More Info"
                  id="desktop-nav-dropdown"
                  className="mx-2 fw-semibold"
                >
                  <NavDropdown.Item as={Link} to="/learn" className="fw-semibold">
                    Learn More
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/privacy" className="fw-semibold">
                    Privacy Policy
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contact" className="fw-semibold">
                    Contact Us
                  </NavDropdown.Item>
                  <NavDropdown.Divider className="" />
                  <NavDropdown.Item as={Link} to="/login" className="text-primary fw-semibold">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup" className="text-primary fw-semibold">
                    Sign Up
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

            {/* This is Bootstrap's default toggle - hidden since we're using custom button */}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="d-none"
            />
          </Container>
        </Navbar>

        {/* Mobile Sidebar Menu (Offcanvas) - Only shows on mobile */}
        <Offcanvas
          show={showMobileMenu}
          onHide={handleCloseMobileMenu}
          placement="start"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton className="bg-primary text-white">
            <Offcanvas.Title className="fs-4">CompatX Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                My Profile
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/compatibility"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                Compatibility Check
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/learn"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                Learn More
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/privacy"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                Privacy Policy
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4 border-bottom"
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                onClick={handleCloseMobileMenu}
                className="py-3 px-4"
              >
                Sign Up
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <main className="main-content">
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/compatibility" element={<CompatibilityChecker />} />
              <Route path="/learn" element={<LearnMore />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Container>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white py-4 mt-5">
          <Container>
            <div className="row">
              <div className="col-md-6">
                <h5>CompatX</h5>
                <p className="mb-0">
                  Making genetic compatibility awareness accessible to everyone.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="mb-0">
                  For educational purposes only. Consult a healthcare
                  professional for medical advice.
                </p>
                <p className="mb-0 mt-2">
                  © {new Date().getFullYear()} CompatX. All rights reserved.
                </p>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
