import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";


export function ToDoEditAppointment(){


    const [appointments, setAppointments] = useState<AppointmentContract[]>([{Appointment_Id:0, Title:'', Description:'', Date:new Date(), UserId:'' }]);
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{

        axios.get(`http://127.0.0.1:3200/get-appointment/${params.id}`)
        .then(response=>{
            setAppointments(response.data);
        })

    },[])

    const formik = useFormik({
        initialValues: {
            Appointment_Id: appointments[0].Appointment_Id ,
            Title: appointments[0].Title,
            Description: appointments[0].Description ,
            Date: appointments[0].Date ,
            UserId: cookies['userid']
        },
        onSubmit:(appointment)=> {
            axios.put(`http://127.0.0.1:3200/edit-appointment/${params.id}`, appointment)
            .then(()=>{
                alert('Appointment Edited Successfully..');
                navigate('/user-dashboard');
            })
        },
        enableReinitialize: true
    })

    return(
        <div className="text-start d-flex justify-content-center">
            <form className="bg-light p-3 mt-4" onSubmit={formik.handleSubmit}>
                <h3>Edit Appointment</h3>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="number" name="Appointment_Id" onChange={formik.handleChange} value={formik.values.Appointment_Id}  className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange} value={formik.values.Title}  className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea  name="Description" onChange={formik.handleChange} value={formik.values.Description} className="form-control"></textarea>
                    </dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" onChange={formik.handleChange} value={formik.values.Date.toString().slice(0, formik.values.Date.toString().indexOf('T'))}  className="form-control" /></dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/user-dashboard" className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}