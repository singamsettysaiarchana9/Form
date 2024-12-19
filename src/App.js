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
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email address.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required.";
    if (!formData.department.trim()) newErrors.department = "Department is required.";
    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of joining is required.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://127.0.0.1:3000/addEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div style={{ padding: "50px", background: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", background: "#fff" }}>
        <h1>Employee Management System</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field} style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
              </label>
              <input
                type={field === "dateOfJoining" ? "date" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
              />
              {errors[field] && <span style={{ color: "red", fontSize: "14px" }}>{errors[field]}</span>}
            </div>
          ))}
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
