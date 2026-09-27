import { useState } from "react";
import "./App.css";

function App() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [editId, setEditId] = useState(null);
    const [preparations, setPreparations] = useState([]);
const [topic, setTopic] = useState("");
const [category, setCategory] = useState("DSA");

const [interviews, setInterviews] = useState([]);
const [roundName, setRoundName] = useState("");
const [interviewDate, setInterviewDate] = useState("");
const [interviewStatus, setInterviewStatus] = useState("Scheduled");
const [interviewNotes, setInterviewNotes] = useState("");
const [selectedApplication, setSelectedApplication] = useState("");

    const [company, setCompany] = useState("");
const [role, setRole] = useState("");
const [packageLpa, setPackageLpa] = useState("");
const [location, setLocation] = useState("");
const [status, setStatus] = useState("Applied");
const [appliedDate, setAppliedDate] = useState("");
const [notes, setNotes] = useState("");

    const handleLogin = async () => {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        setMessage(data.message);

  if (data.user) {
    setUser(data.user);
}
    };

   const loadApplications = async () => {

    const response = await fetch(
        `http://localhost:5000/api/applications/${user.id}`
    );

    const data = await response.json();

    setApplications(data);
};
const loadPreparations = async () => {

    const response = await fetch(
        `http://localhost:5000/api/preparation/${user.id}`
    );

    const data = await response.json();

    setPreparations(data);
};
const loadInterviews = async (applicationId) => {

    const response = await fetch(
        `http://localhost:5000/api/interviews/${applicationId}`
    );

    const data = await response.json();

    setInterviews(data);
};
const handleAddInterview = async () => {

    const response = await fetch(
        "http://localhost:5000/api/interviews",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                application_id: selectedApplication,
                round_name: roundName,
                interview_date: interviewDate,
                status: interviewStatus,
                notes: interviewNotes
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    setRoundName("");
    setInterviewDate("");
    setInterviewNotes("");

    loadInterviews(selectedApplication);
};

const handleAddPreparation = async () => {

    const response = await fetch(
        "http://localhost:5000/api/preparation",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                topic: topic,
                category: category
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    setTopic("");

    loadPreparations();
};

const handleAddApplication = async () => {

    const response = await fetch(
        "http://localhost:5000/api/applications",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                company: company,
                role: role,
                package_lpa: packageLpa,
                location: location,
                status: status,
                applied_date: appliedDate,
                notes: notes
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    loadApplications();
};

const handleUpdateApplication = async () => {

    const response = await fetch(
        `http://localhost:5000/api/applications/${editId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company: company,
                role: role,
                package_lpa: packageLpa,
                location: location,
                status: status,
                applied_date: appliedDate,
                notes: notes
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    setEditId(null);

    loadApplications();
};
        const handleRegister = async () => {

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        setMessage(data.message);
    };

    return (
            <div className="auth-container">

    <h1 className="app-title">PlacePilot</h1>
    <p className="app-tagline">Your Placement Journey, Organized.</p>



        {isRegister ? (

            <div>
                <h2>Register</h2>

                    <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
/>

                    <br /><br />

                    <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>

                    <br /><br />

                    <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

                    <br /><br />

                    <button onClick={handleRegister}>
    Register
</button>
<p>{message}</p>

                    <br /><br />

                    <button onClick={() => setIsRegister(false)}>
                        Back to Login
                    </button>
                </div>

            ) : (

                <div>
                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br /><br />

                    <button onClick={handleLogin}>
                        Login
                    </button>

                    <br /><br />

                    <p>{message}</p>

                    {user && (
   <div className="dashboard">

       <h3>Welcome, {user.name}!</h3>

<button
    className="logout-button"
    onClick={() => {
        setUser(null);

        setEmail("");
        setPassword("");

        setApplications([]);

        setCompany("");
        setRole("");
        setPackageLpa("");
        setLocation("");
        setStatus("Applied");
        setAppliedDate("");
        setNotes("");

        setMessage("Logout successful");
    }}
>
    Logout
</button>
<br />
        <button onClick={loadApplications}>
            Load Applications
        </button>
        <br /><br />

<input
    type="text"
    placeholder="Search company..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>
<br /><br />

<select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
>
    <option value="All">All Status</option>
    <option value="Applied">Applied</option>
    <option value="Test">Test</option>
    <option value="Interview">Interview</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
</select>

<div className="application-form">

        <h3>Add Application</h3>

<input
    type="text"
    placeholder="Company"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
/>

<br /><br />

<input
    type="text"
    placeholder="Role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
/>

<br /><br />

<input
    type="number"
    placeholder="Package (LPA)"
    value={packageLpa}
    onChange={(e) => setPackageLpa(e.target.value)}
/>

<br /><br />

<input
    type="text"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
/>

<br /><br />

<select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
>
    <option value="Applied">Applied</option>
    <option value="Test">Test</option>
    <option value="Interview">Interview</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
</select>

<br /><br />

<input
    type="date"
    value={appliedDate}
    onChange={(e) => setAppliedDate(e.target.value)}
/>

<br /><br />

<textarea
    placeholder="Notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
></textarea>

<br /><br />

<button onClick={handleAddApplication}>
    Add Application
</button>
</div>

{editId && (
    <div>
        <h3>Edit Application</h3>

        <p>Editing application ID: {editId}</p>

        <input
    type="text"
    placeholder="New Company"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
/>
<br /><br />

<input
    type="text"
    placeholder="New Role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
/>
<br /><br />

<input
    type="number"
    placeholder="New Package (LPA)"
    value={packageLpa}
    onChange={(e) => setPackageLpa(e.target.value)}
/>
<br /><br />

<input
    type="text"
    placeholder="New Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
/>
<br /><br />

<select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
>
    <option value="Applied">Applied</option>
    <option value="Test">Test</option>
    <option value="Interview">Interview</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
</select>
<br /><br />

<input
    type="date"
    value={appliedDate}
    onChange={(e) => setAppliedDate(e.target.value)}
/>
<br /><br />

<textarea
    placeholder="New Notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
></textarea>
<button onClick={handleUpdateApplication}>
    Update Application
</button>

        <button onClick={() => setEditId(null)}>
            Cancel
        </button>
    </div>
)}
    {applications
    .filter((app) =>
        app.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((app) =>
        filterStatus === "All" || app.status === filterStatus
    )
    .map((app) => (

            <div className="application-card" key={app.id}>

                <h3>{app.company}</h3>

                <p>Role: {app.role}</p>

                <p>Package: {app.package_lpa} LPA</p>

              <p className="application-status">
    Status: <strong>{app.status}</strong>
</p>

                <p>Location: {app.location}</p>

                <button onClick={async () => {

    await fetch(
        `http://localhost:5000/api/applications/${app.id}`,
        {
            method: "DELETE"
        }
    );

    loadApplications();

}}>
    Delete
</button>

<button onClick={() => {

    setEditId(app.id);
    setCompany(app.company);
    setRole(app.role);
    setPackageLpa(app.package_lpa);
    setLocation(app.location);
    setStatus(app.status);
    setAppliedDate(app.applied_date.slice(0, 10));
    setNotes(app.notes || "");

}}>
    Edit
</button>

                <hr />

            </div>

              ))}


        <hr />

<div className="preparation-section">

        <h2>Preparation Tracker</h2>

        <button onClick={loadPreparations}>
            Load Preparation
        </button>

        <br /><br />

        <input
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
        />

        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="DSA">DSA</option>
            <option value="SQL">SQL</option>
            <option value="OOP">OOP</option>
            <option value="OS">OS</option>
            <option value="DBMS">DBMS</option>
            <option value="Aptitude">Aptitude</option>
            <option value="Interview">Interview</option>
        </select>

        <button onClick={handleAddPreparation}>
            Add Topic
        </button>

        <br /><br />

{preparations.map((item) => (
    <div className="preparation-card" key={item.id}>

        <strong>{item.topic}</strong> - {item.category}

        <span>
            {item.completed ? " ✅ Completed" : " ⏳ Pending"}
        </span>

        <button onClick={async () => {

            await fetch(
                `http://localhost:5000/api/preparation/${item.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        completed: !item.completed
                    })
                }
            );

            loadPreparations();

        }}>
            {item.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button onClick={async () => {

            await fetch(
                `http://localhost:5000/api/preparation/${item.id}`,
                {
                    method: "DELETE"
                }
            );

            loadPreparations();

        }}>
            Delete
        </button>

        <br /><br />

    </div>
))}

</div>
{/* ADD INTERVIEW SECTION HERE */}

<hr />

<div className="interview-section">
<h2>Interview Details</h2>

<select
    value={selectedApplication}
    onChange={(e) => {
        setSelectedApplication(e.target.value);
        loadInterviews(e.target.value);
    }}
>
    <option value="">Select Application</option>

    {applications.map((app) => (
        <option key={app.id} value={app.id}>
            {app.company} - {app.role}
        </option>
    ))}
</select>

<br /><br />

<input
    type="text"
    placeholder="Round Name"
    value={roundName}
    onChange={(e) => setRoundName(e.target.value)}
/>

<br /><br />

<input
    type="date"
    value={interviewDate}
    onChange={(e) => setInterviewDate(e.target.value)}
/>

<br /><br />

<select
    value={interviewStatus}
    onChange={(e) => setInterviewStatus(e.target.value)}
>
    <option value="Scheduled">Scheduled</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
</select>

<br /><br />

<textarea
    placeholder="Interview Notes"
    value={interviewNotes}
    onChange={(e) => setInterviewNotes(e.target.value)}
></textarea>

<br /><br />

<button onClick={handleAddInterview}>
    Add Interview
</button>

<br /><br />

{interviews.map((interview) => (
    <div className="interview-card" key={interview.id}>

        <strong>{interview.round_name}</strong>

        <p>Date: {interview.interview_date.slice(0, 10)}</p>

        <p>Status: {interview.status}</p>

        <p>Notes: {interview.notes}</p>

        <button onClick={async () => {

    await fetch(
        `http://localhost:5000/api/interviews/${interview.id}`,
        {
            method: "DELETE"
        }
    );

    loadInterviews(selectedApplication);

}}>
    Delete
</button>

        <hr />

    </div>
))}
</div> 

</div>
)}

<br />

<button onClick={() => setIsRegister(true)}>
    Register here
</button>
                </div>
            )}
        </div>
        
    );
}

export default App;