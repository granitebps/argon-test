import React, { useState } from 'react';
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
  CRow,
} from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CreateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreate = async (payload) => {
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('email', payload.email);
      formData.append('position', payload.position);
      formData.append('phone', payload.phone);
      formData.append('password', payload.password);
      formData.append('image', payload.image[0]);

      const token = localStorage.getItem('mat');
      await axios.post(`users`, formData, {
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Create User</strong>
          </CCardHeader>
          <CCardBody>
            {error != '' && <CAlert color='danger'>{error}</CAlert>}
            {success != '' && (
              <CAlert color='success' dismissible>
                {success}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit(handleCreate)}>
              <div className='mb-3'>
                <CFormLabel>Name</CFormLabel>
                {errors.name ? errors.name.message : ''}
                <CFormInput
                  {...register('name', { required: 'Required' })}
                  invalid={errors.name ? true : false}
                  feedbackInvalid={errors?.name?.message}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  {...register('email', { required: 'Required' })}
                  invalid={errors.email ? true : false}
                  feedbackInvalid={errors?.email?.message}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Image</CFormLabel>
                <CFormInput
                  type='file'
                  id='formFile'
                  {...register('image', { required: 'Required' })}
                  invalid={errors.image ? true : false}
                  feedbackInvalid={errors?.image?.message}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Position</CFormLabel>
                <CFormInput
                  {...register('position', { required: 'Required' })}
                  invalid={errors.position ? true : false}
                  feedbackInvalid={errors?.position?.message}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Phone Number</CFormLabel>
                <CFormInput
                  {...register('phone', { required: 'Required' })}
                  invalid={errors.phone ? true : false}
                  feedbackInvalid={errors?.phone?.message}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Change Password</CFormLabel>
                <CFormInput
                  type='password'
                  {...register('password', { required: 'Required' })}
                  invalid={errors.password ? true : false}
                  feedbackInvalid={errors?.password?.message}
                />
              </div>

              <CButton color='primary' type='submit'>
                Create
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CreateUser;
