import { Row,Col,Container } from 'react-bootstrap';
import React, { useEffect } from 'react';
import '../style/styles.css'
import TimePicker from 'react-time-picker';

const Booking = () => {
  // const { workouts, dispatch } = useWorkoutsContext();
  const [emails,setEmails]=React.useState('');
  const [firstname,setFirstname]=React.useState('');
  const [lastnmae,setLastname]=React.useState('');
  const [phone,setPhone]=React.useState('');
  const [date,setDate]=React.useState('');
  const [time,setTime]=React.useState('');
  useEffect(() => {
    // const fetchWorkouts = async () => {
    //   const response = await fetch('/api/workouts');
    //   const json = await response.json();
    //   if (response.ok) {
    //     dispatch({ type: 'SET_WORKOUTS', payload: json });
    //   }
    // };
    // fetchWorkouts();
  }, []);
  const Handleonchange=(event,data)=>{
    if(data=="firstname"){
      setFirstname(event.target.value)
    }
    else if(data=="phone"){
      setPhone(event.target.value)
    }
    else if(data=="lastname"){
      setLastname(event.target.value)

    }
    else if(data=="email"){
      setEmails(event.target.value)
    }
    else if(data=="date"){
      setTimeout(()=>{
        setDate(event.target.value.toString())
        console.log(event.target.value)

      },1000)

    }
    else if(data=="time"){
      setTimeout(()=>{
        setTime(event.target.value)
        console.log(event.target.value.toString())

      },1000)

    }

  }
  const bookAppointment=()=>{
    let req={}
    req.firstName=firstname;
    req.date=date;
    req.time=time;
    req.lastNmae=lastnmae;
    req.email=emails;
  }

  return (
 <Container  className='d-flex  justify-content-start align-items-start p-4' style={{  width:'100%',height:'100vh'}}>

<div  className='p-4' style={{width:'40%'}}>
  <form onSubmit={bookAppointment}>
 <div className="mb-2">
   <label style={{alignSelf:'left'}}>First Name</label>
   <input
   
     type="text"
     className="form-control"
     onChange={(event)=>Handleonchange(event,"firstname")}
     placeholder="Enter Fname"
     style={{border:'1px solid grey'}}
     required
   />
   </div>
   <div className="mb-2">
     <label style={{alignSelf:'left'}}>Last Name</label>
   <input
     type="text"
     className="form-control "
     onChange={(event)=>Handleonchange(event,"lastname")}
     placeholder="Enter Lname"
     style={{border:'1px solid grey'}}
     required
   />
   </div>
   <div className="mb-2">
     <label style={{alignSelf:'left'}}>Email</label>
   <input
     type="email"
     className="form-control "
     placeholder="Enter email"
     onChange={(event)=>Handleonchange(event,"email")}
     style={{border:'1px solid grey'}}
     required
   />
   </div>
   <div className="mb-2">
     <label style={{alignSelf:'left'}}>Phone</label>
   <input
     type="text"
     className="form-control "
     onChange={(event)=>Handleonchange(event,"phone")}
     placeholder="Enter phone"
     style={{border:'1px solid grey'}}
     required
   />

   </div>
   <div className="mb-2">
     <label style={{alignSelf:'left'}}>Service</label>
    <select  onChange={(event)=>Handleonchange(event,"service")} className="form-control inpt"  style={{border:'1px solid grey'}}>
<option value="" style={{color:'grey'}}>Select service</option>
<option value="mobile">Mobile</option>
<option value="laptops">Laptop</option>
<option value="furniture">Furniture</option>
</select>
   
   </div>
   <div className="mb-2">
     <label style={{alignSelf:'left'}}>Date</label>
   <input
     type="date"
     className="form-control inpt"
     onChange={(event)=>Handleonchange(event,"date")}
     placeholder="select date"
     style={{border:'1px solid grey'}}
     required
   />
   
 </div> 
 <div className="mb-2">
     <label style={{alignSelf:'left'}}>Time</label>
   <input
     type="time"
     className="form-control inpt"
     onChange={(event)=>Handleonchange(event,"time")}
     placeholder="select time"
     style={{border:'1px solid grey'}}
     required
   />
   
 </div> 
 <div className="mb-3">
 <button type="button" className="btns">Book Appointment</button>
   
 </div> 
  </form> 
  </div>
  </Container>
  );
};

export default Booking;
