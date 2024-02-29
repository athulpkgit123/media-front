import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({handleResponse}) {

  const [uploadData, setUploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""

  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // setInput function definition

  const setInput = (e) => {

    const { name, value } = e.target

    setUploadData({ ...uploadData, [name]: value })

    // setUploadData(e.target.value)



  }
  console.log(uploadData);

  // extract youtube url

  const extractUrl = (e) => {
    // console.log(e.target.value);

    let youtubeUrl = e.target.value

    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v=")
      console.log(index);
      let videourl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videourl);

      let videoData = uploadData
      videoData.url = `https://www.youtube.com/embed/${videourl}`
      setUploadData(videoData)



    }
    console.log(uploadData);
  }
  // define handleAdd function
  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploadData
    if (!id || !caption || !thumbnail || !url) {
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
      let response = await addVideo(uploadData)


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

      }

      else {
        toast.error("please provide a unique id!!!",{
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


  return (
    <>

      <div onClick={handleShow} className='btn'>

      


        <PlusCircle color='green' size={50} />

      </div>

      {/* modals */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload viedo details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            {/* id */}
            <FloatingLabel className='mb-3' controlId="floatingid" label="id">
              <Form.Control name='id' onChange={setInput} type="text" placeholder="uploading video id" />
            </FloatingLabel>



            {/* caption */}

            <FloatingLabel className='mb-3' controlId="floatingcaption" label="uploading video caption">
              <Form.Control name='caption' onChange={setInput} type="text" placeholder="uploading video caption " />
            </FloatingLabel>


            {/* image url */}

            <FloatingLabel className='mb-3' controlId="floatingimage" label="video cover URL">
              <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder=" video cover image URL" />
            </FloatingLabel>

            {/* video link */}
            <FloatingLabel className='mb-3' controlId="floatinglink" label="uploading video Link">
              <Form.Control name='url' onChange={extractUrl} type="text" placeholder=" video Link" />
            </FloatingLabel>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />



    </>
  )
}

export default Add