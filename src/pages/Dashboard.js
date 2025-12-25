import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Badge,
  ProgressBar,
} from "react-bootstrap";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    const savedProfile = localStorage.getItem("healthProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      reset(parsedProfile);
    }
  }, [reset]);

  const onSubmit = (data) => {
    setProfile(data);
    localStorage.setItem("healthProfile", JSON.stringify(data));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const genotypes = ["AA", "AS", "SS", "AC", "SC", "CC"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const getGenotypeColor = (genotype) => {
    switch (genotype) {
      case "AA":
        return "success";
      case "AS":
        return "warning";
      case "SS":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getGenotypeRisk = (genotype) => {
    switch (genotype) {
      case "AA":
        return "Low Risk";
      case "AS":
        return "Carrier";
      case "SS":
        return "High Risk";
      default:
        return "Medium Risk";
    }
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">My Health Profile</h1>
        <p className="lead text-muted">
          Complete your health profile to check genetic compatibility with
          potential partners.
        </p>
        {profile && (
          <Badge bg="info" className="fs-6 p-3">
            Profile Completion: {Object.values(profile).filter((v) => v).length}
            /8 fields
          </Badge>
        )}
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert
          variant="success"
          className="text-center"
          dismissible
          onClose={() => setSaveSuccess(false)}
        >
          Profile saved successfully!
        </Alert>
      )}

      <Row>
        {/* Form Column */}
        <Col lg={8}>
          <Card className="shadow-lg border-0 mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0"> Edit Health Information</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name")}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label> Age</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter your age"
                        {...register("age")}
                        min="18"
                        max="100"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label> Genotype *</Form.Label>
                      <Form.Select
                        {...register("genotype", {
                          required: "Genotype is required",
                        })}
                        isInvalid={!!errors.genotype}
                      >
                        <option value="">Select your genotype</option>
                        {genotypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.genotype?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label> Blood Group *</Form.Label>
                      <Form.Select
                        {...register("bloodGroup", {
                          required: "Blood group is required",
                        })}
                        isInvalid={!!errors.bloodGroup}
                      >
                        <option value="">Select your blood group</option>
                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.bloodGroup?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select {...register("gender")}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location (Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., Lagos, Nigeria"
                        {...register("location")}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label> Allergies & Medical Conditions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="List any allergies or medical conditions"
                    {...register("allergies")}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label> Current Medications</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="List any current medications"
                    {...register("medications")}
                  />
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={!isDirty}
                  >
                    Save Profile
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    onClick={() => reset(profile || {})}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Preview Column */}
        <Col lg={4}>
          <Card className="shadow-lg border-0 mb-4">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">Profile Preview</h4>
            </Card.Header>
            <Card.Body>
              {profile ? (
                <div>
                  <div className="text-center mb-4">
                    <div
                      className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <span className="display-4"></span>
                    </div>
                    <h4 className="mt-3">{profile.name || "Anonymous User"}</h4>
                    {profile.location && (
                      <p className="text-muted">{profile.location}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <h6> Genotype</h6>
                    <Badge
                      bg={getGenotypeColor(profile.genotype)}
                      className="fs-6 p-2"
                    >
                      {profile.genotype} - {getGenotypeRisk(profile.genotype)}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <h6>Blood Group</h6>
                    <Badge bg="dark" className="fs-6 p-2">
                      {profile.bloodGroup}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <h6>Profile Details</h6>
                    <table className="table table-sm">
                      <tbody>
                        {profile.age && (
                          <tr>
                            <td>
                              <strong>Age:</strong>
                            </td>
                            <td>{profile.age} years</td>
                          </tr>
                        )}
                        {profile.gender && (
                          <tr>
                            <td>
                              <strong>Gender:</strong>
                            </td>
                            <td>{profile.gender}</td>
                          </tr>
                        )}
                        {profile.allergies && (
                          <tr>
                            <td>
                              <strong>Allergies:</strong>
                            </td>
                            <td>{profile.allergies}</td>
                          </tr>
                        )}
                        {profile.medications && (
                          <tr>
                            <td>
                              <strong>Medications:</strong>
                            </td>
                            <td>{profile.medications}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <Alert variant="info" className="small">
                    <strong> Note:</strong> Your profile is stored locally on
                    this device. Clear browser data to remove it.
                  </Alert>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-3"></div>
                  <h5>No Profile Saved</h5>
                  <p className="text-muted">
                    Fill out the form to create your health profile.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Quick Stats Card */}
          {profile && (
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0"> Quick Stats</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <h6>Profile Completion</h6>
                  <ProgressBar
                    now={75}
                    label="75%"
                    variant="success"
                    className="mb-3"
                  />
                </div>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="border rounded p-2">
                      <div className="fs-4"></div>
                      <div className="fw-bold">{profile.genotype || "--"}</div>
                      <small className="text-muted">Genotype</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border rounded p-2">
                      <div className="fs-4"></div>
                      <div className="fw-bold">
                        {profile.bloodGroup || "--"}
                      </div>
                      <small className="text-muted">Blood Group</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
