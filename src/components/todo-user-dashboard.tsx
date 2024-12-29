import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate, Link} from "react-router-dom";
import { AppointmentContract } from "../contracts/AppointmentContract";
import axios from "axios";


export function ToDoUserDashBoard()
{

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    const [appointments, setAppointments] = useState<AppointmentContract[]>();

    useEffect(()=>{

        axios.get(`http://127.0.0.1:3200/appointments/${cookies['userid']}`)
        .then(response=>{
             setAppointments(response.data);
        })

    },[])

    let navigate = useNavigate();

    function handleSignout(){
        removeCookie('userid');
        navigate('/login');
    }

    return(
        <div className="p-2">
              <nav className="d-flex justify-content-between mt-4 p-2">
                <div className="h3 text-light">{cookies['userid']} - Dashboard</div>
                <div className="ms-4"><button onClick={handleSignout} className="btn btn-danger">Signout</button></div>
              </nav>
              <section className="text-start" style={{height:'100vh'}}>
                 <div>
                    <Link to="/add-appointment" className="bi bi-calendar-date btn btn-dark"> Add Appointment</Link>
                 </div>
                 <div>
                    {
                        appointments?.map(appointment=>
                            <div className="alert w-50 my-4 alert-success" key={appointment.Appointment_Id}>
                                <h2>{appointment.Title}</h2>
                                <p>{appointment.Description}</p>
                                <div className="bi bi-calendar-date"> {appointment.Date.toString()} </div>
                                <div className="mt-2">
                                    <Link to={`/delete-appointment/${appointment.Appointment_Id}`} className="bi bi-trash btn btn-danger me-2"> Remove </Link>
                                    <Link to={`/edit-appointment/${appointment.Appointment_Id}`} className="bi bi-pen-fill btn btn-warning"> Edit </Link>
                                </div>
                            </div>

                        )
                    }
                 </div>
              </section>
        </div>
    )
}