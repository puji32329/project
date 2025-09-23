import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewOwners() 
{
    const [owners, setOwners] = useState([]);
    const [error, setError] = useState("");

    const displayOwners = async () => 
      {
        try 
        {
            const response = await axios.get(`${config.url}/admin/viewallowners`);
            setOwners(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch owners data ... " + err.message);
        } 
    };

    useEffect(() => {
      displayOwners();
    }, []);

    const deleteOwner = async (oid) => 
        {
            try 
            {
                const response = await axios.delete(`${config.url}/admin/deleteowner?oid=${oid}`);
                toast.success(response.data);  // show success toast
                displayOwners();           // refresh owners list
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
                <u>View All Owners</u>
            </h3>

            <ToastContainer position="top-center" autoClose={4000} />


            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    {error}
                </p>
            ) : owners.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    No Owners Data Found
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
                            <th>Company Name</th>
                            <th>Company Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map((owner) => (
                            <tr key={owner.id}>
                                <td>{owner.id}</td>
                                <td>{owner.name}</td>
                                <td>{owner.gender}</td>
                                <td>{owner.dob}</td>
                                <td>{owner.email}</td>
                                <td>{owner.username}</td>
                                <td>{owner.mobileno}</td>
                                <td>{owner.company_name}</td>
                                <td>{owner.company_location}</td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteOwner(owner.id)}
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
