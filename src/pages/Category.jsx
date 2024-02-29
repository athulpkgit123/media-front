import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addCategory, getVideos, updateCategory } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategory,deleteCategory } from '../service/allapi'
import { useEffect } from 'react';
import { Trash, Trash2, Video } from 'react-feather';
import VideoCard from './VideoCard';
import { Col, Row } from 'react-bootstrap'


function Category({ handleResponse }) {
const [uploadcat, setUploadcat] = useState({
    id: "", caption: "", allVideos: []
})
  
   const [allCategories, setallCategories] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // setInput function definition

  const setInput = (e) => {

    const { name, value } = e.target

    setUploadcat({ ...uploadcat, [name]: value })
  }
  console.log(uploadcat);

  // define handleAdd function
  const handleAdd = async () => {
    const { id, caption } = uploadcat
    if (!id || !caption) {
      toast.warning("please fill the form completely", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    else {
      let response = await addCategory(uploadcat)


      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data);
        handleResponse(response.data)

        setShow(false)
        toast.success("video uploaded successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

        })
        getallCategories()

      }

      else {
        toast.error("please provide a unique id!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }

    }
  }

  useEffect(() => {

    getallCategories()

  }, [])



  const getallCategories = async () => {

    // api call

    const response = await getCategory()
    //  console.log(response.data);
    setallCategories(response.data)

  }

  console.log(allCategories);


const handleDeleteCategory=async(e,id)=>{
  e.preventDefault()

  // api call for delete category
   const res= await deleteCategory(id)
   console.log(res);
   getallCategories()

}
// define on drag over 
  const  dragOver=(e)=>{

    e.preventDefault()
    console.log("dragging over the category");
  }
 const dropped=async(e,categoryId)=>{
  console.log("categoryid",categoryId);
  let sourceCardId=e.dataTransfer.getData("cardId")
  console.log ("source card id",sourceCardId);

     const {data}= await  getVideos(sourceCardId)
     console.log(data);


     let selectedCategory=allCategories.find(Category=>Category.id==categoryId)
     console.log("target category details",selectedCategory);
     selectedCategory.allVideos.push(data)
     console.log("updated category details", selectedCategory);
        await updateCategory(categoryId, selectedCategory)
     getallCategories()

     
 }
  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>Add category</div>
      </div>


            {

                allCategories.map(Category => (
                <div  droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,Category?.id)}>
                <div className='d-flex justify-content-between border rounded mt-3 p-3'>
                <h4>{Category?.caption}</h4>
                <span onClick={e=>handleDeleteCategory(e,Category?.id)} >  <Trash2 color='red' /></span>
                 
                 

                    <Row>
                      {
                    Category?.allVideos?.map((card)=>(
                     <Col>
                    
                    <VideoCard card={card} insideCategory={true}/>


                   
                  </Col>

                    ))

                      }

                    </Row>

                 

                </div>
                </div>
               
              ))
            }

            



      {/* modals */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <FloatingLabel className='mb-3' controlId="floatingid" label="id">
              <Form.Control name='id' onChange={setInput} type="text" placeholder="category id" />
            </FloatingLabel>


            <FloatingLabel className='mb-3' controlId="floatingcaption" label="caption">
              <Form.Control name='caption' onChange={setInput} type="text" placeholder="caption " />
            </FloatingLabel>


          </Form>



        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



export default Category







