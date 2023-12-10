import React, { useEffect, useState } from 'react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CRow,
} from '@coreui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const UpdateUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const load = async () => {
      try {
        const authToken = localStorage.getItem('mat');
        if (!authToken) {
          return navigate('/', { replace: true });
        }
        const { data } = await axios.get(`/users/${params.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, [params.id]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onError = (err) => {
    console.log('error:', err, errors);
  };

  const handleUpdate = async (payload) => {
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('email', payload.email);
      formData.append('position', payload.position);
      formData.append('phone', payload.phone);
      if (payload.password) {
        formData.append('password', payload.password);
      }
      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('mat');
      await axios.put(`users/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/users', { replace: true });
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  if (!user) {
    return (
      <div className='pt-3 text-center'>
        <div className='sk-spinner sk-spinner-pulse'></div>
      </div>
    );
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Update User</strong>
          </CCardHeader>
          <CCardBody>
            {error != '' && <CAlert color='danger'>{error}</CAlert>}
            {success != '' && (
              <CAlert color='success' dismissible>
                {success}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit(handleUpdate, onError)}>
              <div className='mb-3'>
                <CFormLabel>Name</CFormLabel>
                {errors.name ? errors.name.message : ''}
                <CFormInput
                  defaultValue={user.name}
                  {...register('name', { required: 'Required' })}
                  invalid={errors.name ? true : false}
                  feedbackInvalid={errors?.name?.message}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Email</CFormLabel>
                <CFormInput defaultValue={user.email} {...register('email', { required: 'Required' })} />
              </div>
              <div className='mb-3'>
                <CFormLabel>Image</CFormLabel>
                <CFormInput type='file' id='formFile' onChange={handleImage} />
                <CImage
                  rounded
                  thumbnail
                  src={`${process.env.REACT_APP_API_URL}/${user.image}`}
                  width={200}
                  height={200}
                  className='mt-3'
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Position</CFormLabel>
                <CFormInput defaultValue={user.position} {...register('position', { required: 'Required' })} />
              </div>
              <div className='mb-3'>
                <CFormLabel>Phone Number</CFormLabel>
                <CFormInput defaultValue={user.phone} {...register('phone', { required: 'Required' })} />
              </div>
              <div className='mb-3'>
                <CFormLabel>Change Password</CFormLabel>
                <CFormInput type='password' {...register('password')} />
              </div>

              <CButton color='primary' type='submit'>
                Update
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UpdateUser;
