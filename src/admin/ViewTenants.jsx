import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewTenants() 
{
    const [tenants, setTenants] = useState([]);
    const [error, setError] = useState("");

    const displayTenants = async () => 
    {
        try 
        {
            const response = await axios.get(`${config.url}/admin/viewalltenants`);
            setTenants(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch tenants data ... " + err.message);
        }
    };

    useEffect(() => {
        displayTenants();
    }, []);

    const deleteTenant = async (tid) => 
    {
        try 
        {
            const response = await axios.delete(`${config.url}/admin/deletetenant?tid=${tid}`);
            toast.success(response.data);  // show success toast
            displayTenants();           // refresh tenant list
        } 
        catch (err) 
        {
            console.log(err);
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message); // show error toast
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
                <u>View All Tenants</u>
            </h3>

            <ToastContainer position="top-center" autoClose={4000} />

            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    {error}
                </p>
            ) : tenants.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    No Tenant Data Found
                </p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Location</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id}>
                                <td>{tenant.id}</td>
                                <td>{tenant.name}</td>
                                <td>{tenant.gender}</td>
                                <td>{tenant.dob}</td>
                                <td>{tenant.email}</td>
                                <td>{tenant.username}</td>
                                <td>{tenant.mobileno}</td>
                                <td>{tenant.location}</td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteTenant(tenant.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
