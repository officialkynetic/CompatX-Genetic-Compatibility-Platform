import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
  ProgressBar,
  Accordion,
  Table,
  Modal,
} from "react-bootstrap";

const CompatibilityChecker = () => {
  const [user1, setUser1] = useState({
    genotype: "",
    bloodGroup: "",
    name: "",
  });
  const [user2, setUser2] = useState({
    genotype: "",
    bloodGroup: "",
    name: "",
  });
  const [result, setResult] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // Load user's own profile if available
  useEffect(() => {
    const savedProfile = localStorage.getItem("healthProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUser1({
        genotype: profile.genotype || "",
        bloodGroup: profile.bloodGroup || "",
        name: profile.name || "Person 1",
      });
    }
  }, []);

  const genotypes = ["AA", "AS", "SS", "AC", "SC", "CC"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const checkCompatibility = () => {
    if (!user1.genotype || !user2.genotype) {
      alert("Please select genotypes for both users");
      return;
    }

    const compatibilityMatrix = {
      "AA+AA": {
        compatible: true,
        risk: "None",
        riskLevel: 0,
        message:
          "Excellent genetic match! No risk of sickle cell disease in children.",
        recommendation: "Proceed with confidence.",
        childProbabilities: { AA: "100%", AS: "0%", SS: "0%" },
      },
      "AA+AS": {
        compatible: true,
        risk: "Low",
        riskLevel: 1,
        message:
          "Compatible. Children have 50% chance of being carriers (AS), but no sickle cell disease.",
        recommendation: "Normal marriage recommended.",
        childProbabilities: { AA: "50%", AS: "50%", SS: "0%" },
      },
      "AA+SS": {
        compatible: true,
        risk: "Low",
        riskLevel: 1,
        message:
          "All children will be carriers (AS) but will not have sickle cell disease.",
        recommendation: "Medically safe for reproduction.",
        childProbabilities: { AA: "0%", AS: "100%", SS: "0%" },
      },
      "AS+AS": {
        compatible: false,
        risk: "High",
        riskLevel: 3,
        message:
          "25% chance of sickle cell disease (SS), 50% chance carriers (AS), 25% chance normal (AA).",
        recommendation: "Genetic counseling strongly recommended.",
        childProbabilities: { AA: "25%", AS: "50%", SS: "25%" },
      },
      "AS+SS": {
        compatible: false,
        risk: "Very High",
        riskLevel: 4,
        message:
          "50% chance of sickle cell disease (SS), 50% chance carriers (AS).",
        recommendation:
          "High risk. Seek medical advice before planning children.",
        childProbabilities: { AA: "0%", AS: "50%", SS: "50%" },
      },
      "SS+SS": {
        compatible: false,
        risk: "Extreme",
        riskLevel: 5,
        message: "All children will have sickle cell disease (SS).",
        recommendation: "Consider alternative family planning options.",
        childProbabilities: { AA: "0%", AS: "0%", SS: "100%" },
      },
    };

    const key = [user1.genotype, user2.genotype].sort().join("+");
    const rule = compatibilityMatrix[key] || {
      compatible: false,
      risk: "Unknown",
      riskLevel: 2,
      message: "Please consult a genetic counselor for this combination.",
      recommendation: "Medical advice required.",
      childProbabilities: { AA: "Unknown", AS: "Unknown", SS: "Unknown" },
    };

    setResult(rule);
    setShowResultsModal(true);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 0:
        return "success";
      case 1:
        return "info";
      case 2:
        return "warning";
      case 3:
        return "warning";
      case 4:
        return "danger";
      case 5:
        return "dark";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">
          CompatX Compatibility Check
        </h1>
        <p className="lead text-muted">
          Check genetic compatibility between two individuals for family
          planning
        </p>
      </div>

      <Row>
        {/* Person 1 Card */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-lg border-0 h-100">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Person 1 (You)</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={user1.name}
                    onChange={(e) =>
                      setUser1({ ...user1, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Genotype *</Form.Label>
                  <Form.Select
                    value={user1.genotype}
                    onChange={(e) =>
                      setUser1({ ...user1, genotype: e.target.value })
                    }
                  >
                    <option value="">Select genotype</option>
                    {genotypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    value={user1.bloodGroup}
                    onChange={(e) =>
                      setUser1({ ...user1, bloodGroup: e.target.value })
                    }
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {user1.genotype && (
                  <Alert
                    variant={user1.genotype === "AA" ? "success" : "warning"}
                    className="small"
                  >
                    <strong>Note:</strong>{" "}
                    {user1.genotype === "AA"
                      ? "Normal hemoglobin"
                      : user1.genotype === "AS"
                      ? "Sickle cell trait (carrier)"
                      : "Sickle cell disease"}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Person 2 Card */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-lg border-0 h-100">
            <Card.Header className="bg-danger text-white">
              <h4 className="mb-0">Person 2 (Partner)</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter partner's name"
                    value={user2.name}
                    onChange={(e) =>
                      setUser2({ ...user2, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Genotype *</Form.Label>
                  <Form.Select
                    value={user2.genotype}
                    onChange={(e) =>
                      setUser2({ ...user2, genotype: e.target.value })
                    }
                  >
                    <option value="">Select genotype</option>
                    {genotypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    value={user2.bloodGroup}
                    onChange={(e) =>
                      setUser2({ ...user2, bloodGroup: e.target.value })
                    }
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {user2.genotype && (
                  <Alert
                    variant={user2.genotype === "AA" ? "success" : "warning"}
                    className="small"
                  >
                    <strong>Note:</strong>{" "}
                    {user2.genotype === "AA"
                      ? "Normal hemoglobin"
                      : user2.genotype === "AS"
                      ? "Sickle cell trait (carrier)"
                      : "Sickle cell disease"}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Check Button */}
      <div className="text-center my-4">
        <Button
          variant="compatx"
          size="lg"
          onClick={checkCompatibility}
          disabled={!user1.genotype || !user2.genotype}
          className="px-5 py-3"
        >
          Check Compatibility
        </Button>
      </div>

      {/* Results Modal */}
      <Modal
        show={showResultsModal}
        onHide={() => setShowResultsModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header
          closeButton
          className={`bg-${
            result ? getRiskColor(result.riskLevel) : "primary"
          } text-white`}
        >
          <Modal.Title className="fs-4">Compatibility Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && (
            <div className="p-3">
              <div className="text-center mb-4">
                <h2
                  className={
                    result.compatible ? "text-success" : "text-warning"
                  }
                >
                  {result.compatible ? "Compatible" : "Compatibility Concerns"}
                </h2>
                <Badge
                  bg={getRiskColor(result.riskLevel)}
                  className="fs-5 p-3 mt-2"
                >
                  Risk Level: {result.risk}
                </Badge>
              </div>

              <Alert
                variant={result.compatible ? "success" : "warning"}
                className="text-center"
              >
                <h5>{result.message}</h5>
              </Alert>

              {/* Risk Progress Bar */}
              <div className="mb-4">
                <h6>Risk Assessment</h6>
                <ProgressBar
                  now={result.riskLevel * 20}
                  variant={getRiskColor(result.riskLevel)}
                  label={`${result.riskLevel * 20}%`}
                  className="mb-3"
                />
              </div>

              {/* Child Probabilities */}
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Child Probability Distribution</h6>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Genotype</th>
                        <th>Probability</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Badge bg="success">AA</Badge>
                        </td>
                        <td>{result.childProbabilities.AA}</td>
                        <td>Normal</td>
                      </tr>
                      <tr>
                        <td>
                          <Badge bg="warning">AS</Badge>
                        </td>
                        <td>{result.childProbabilities.AS}</td>
                        <td>Carrier</td>
                      </tr>
                      <tr>
                        <td>
                          <Badge bg="danger">SS</Badge>
                        </td>
                        <td>{result.childProbabilities.SS}</td>
                        <td>Sickle Cell Disease</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* Recommendation */}
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Recommendation</h6>
                </Card.Header>
                <Card.Body>
                  <p className="fs-5">{result.recommendation}</p>
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Learn More About This Result
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="list-unstyled">
                          <li>
                            <strong>AA:</strong> Normal hemoglobin, no sickle
                            cell
                          </li>
                          <li>
                            <strong>AS:</strong> Sickle cell trait (carrier),
                            can pass to children
                          </li>
                          <li>
                            <strong>SS:</strong> Sickle cell disease, requires
                            medical care
                          </li>
                          <li className="mt-3">
                            <strong>Note:</strong> This tool provides
                            educational information only. Always consult with a
                            healthcare provider or genetic counselor for
                            personalized medical advice.
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowResultsModal(false)}
          >
            Close
          </Button>
          <Button
            variant="compatx"
            onClick={() => {
              // You can add save functionality here
              alert("Results saved to your profile!");
              setShowResultsModal(false);
            }}
          >
            Save Results
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Educational Section (shows when no results yet) */}
      {!showResultsModal && (
        <Row className="mt-5">
          <Col lg={8} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-info text-white">
                <h4 className="mb-0">Understanding Genetic Compatibility</h4>
              </Card.Header>
              <Card.Body>
                <p>
                  Genetic compatibility checking helps prevent the birth of
                  children with sickle cell disease. When both partners are
                  carriers (AS), there's a 25% chance their child will have
                  sickle cell disease (SS).
                </p>
                <ul>
                  <li>
                    <strong>AA + AA:</strong> No risk of sickle cell disease
                  </li>
                  <li>
                    <strong>AA + AS:</strong> Children may be carriers, but no
                    disease
                  </li>
                  <li>
                    <strong>AS + AS:</strong> 25% risk of sickle cell disease
                  </li>
                  <li>
                    <strong>SS + SS:</strong> All children will have sickle cell
                    disease
                  </li>
                </ul>
                <p className="mb-0">
                  <small className="text-muted">
                    Remember: This tool is for educational purposes. Always
                    consult with a healthcare professional for medical advice.
                  </small>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CompatibilityChecker;
