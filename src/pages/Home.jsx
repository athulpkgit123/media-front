import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Col} from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { Link } from 'react-router-dom'


function Home() {

  const [serverRes,setserverRes]=useState({})
  // function definition
  const handleResponse=(res)=>{
    setserverRes(res)

  }
  return (
    <div  className='container-fluid'>
      <Link  style={{textDecoration:'none',fontSize:'30px',color:'blue'}} to={'/watchhistory'}> Watch history</Link>
<Row>

{/* add component */}
<Col lg={1}>
  <Add  handleResponse= {handleResponse}/>
</Col>
{/* view component */}

<Col lg={7}>
  <View serverRes={serverRes}/>

</Col>

{/* category component */}

<Col lg={4}>
  <Category handleResponse= {handleResponse}  />

</Col>

</Row>


    </div>
  )
}

export default Home


