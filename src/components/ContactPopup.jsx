import { useState } from "react";
import "../components/contactPopup.css";

export default function ContactPopup({ onClose }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        services: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});



    // STRICT VALIDATION FUNCTION
    const validate = () => {

        let newErrors = {};

        // Name validation
        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            newErrors.email = "Valid email required";
        }

        // Phone validation (numbers only, 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(form.phone)) {
            newErrors.phone = "Phone must be exactly 10 digits";
        }

        // Services validation
        if (!form.services) {
            newErrors.services = "Please select a service";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    // HANDLE CHANGE WITH STRICT NUMBER CONTROL
    const handleChange = (e) => {

        const { name, value } = e.target;

        // Restrict phone to numbers only
        if (name === "phone") {

            const numericValue = value.replace(/[^0-9]/g, "");

            setForm({
                ...form,
                phone: numericValue
            });

        } else {

            setForm({
                ...form,
                [name]: value
            });

        }

    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            const response = await fetch("https://durgam-vamshi-2.onrender.com/api/contact"
                // "https://syncaibackend-wu99.onrender.com/api/contact"
                , {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });

            const data = await response.json();

            if (data.success) {

                alert("Contact submitted successfully!");

                setForm({
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                    services: "",
                    message: ""
                });

                setErrors({});
                onClose();

            } else {

                alert(data.message || "Submission failed");

            }

        } catch (error) {

            alert("Server error");

        } finally {

            setLoading(false);

        }
    };



    return (
        <div className="popup-overlay">

            <div className="popup">

                <button className="popup-close" onClick={onClose}>
                    X
                </button>

                <h2>Contact Us</h2>

                <form onSubmit={handleSubmit} noValidate>

                    {/* NAME */}
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}



                    {/* EMAIL */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}



                    {/* COMPANY */}
                    <input
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                    />



                    {/* PHONE STRICT NUMERIC */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone (10 digits)"
                        value={form.phone}
                        onChange={handleChange}
                        maxLength="10"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}



                    {/* SERVICES */}
                    <select
                        name="services"
                        value={form.services}
                        onChange={handleChange}
                    >
                        <option value="">Select option</option>
                        <option value="All Access">All Access</option>
                        <option value="Custom SLMs">Custom SLMs</option>
                        <option value="Private LLM deployment">Private LLM deployment</option>
                        <option value="AI Workflow automation">AI Workflow automation</option>
                        <option value="AI consulting/strategy">AI consulting/strategy</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Custom Solution">Custom Solution</option>
                    </select>
                    {errors.services && <p className="error">{errors.services}</p>}



                    {/* MESSAGE */}
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                    />



                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                </form>

            </div>

        </div>
    );
}