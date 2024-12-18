import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    phoneNumber: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const validate = () => {
    const newErrors = {};

    
    if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain an '@' symbol.";
    }
    if (formData.phoneNumber.length !== 10 || isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        setFormData({
          name: "",
          email: "",
          employeeId: "",
          department: "",
          phoneNumber: "",
          dateOfJoining: "",
          role: "",
        });
        setErrors({});
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f9f9f9",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #ccc",
          padding: "20px",
          width: "500px",
        }}
      >
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
          Employee Management System
        </h1>
        <form onSubmit={handleSubmit}>
          {[
            "name",
            "email",
            "employeeId",
            "department",
            "phoneNumber",
            "dateOfJoining",
            "role",
          ].map((field) => (
            <div key={field} style={{ marginBottom: "10px" }}>
              <h2 style={{ marginBottom: "5px" }}>{field.replace(/([A-Z])/g, " $1")}</h2>
              <input
                type={field === "dateOfJoining" ? "date" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                style={{ padding: "10px", fontSize: "16px", width: "450px" }}
              />
              {errors[field] && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors[field]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
