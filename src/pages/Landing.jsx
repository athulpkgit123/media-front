import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


  function Landing() {

  // function definition

  const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate('/home') 
}
  return (
    <div>
<Row className='align-items-center'>

<Col></Col>

<Col  lg={6} >

<h1> Welcom to video.com</h1>
<p style={{textAlign:'justify'}}>where user can use their favourite viedos ,user can upload any youtube </p>

<button onClick={handleNavigate} className='btn btn-success'>Click here to know more </button>
</Col>
<Col lg={5} >

<img className='img-fluid' width={'300px'} height={'300px'} src="https://imgeng.jagran.com/images/2023/apr/Youtube%20(4)1681217487204.jpg" alt="no img" />
</Col>
</Row>
</div>
  )
}

export default Landing