import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilEnvelopeClosed } from '@coreui/icons';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [emailInvalid, setEmailInvalid] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const authToken = localStorage.getItem('at');
  if (authToken) {
    return <Navigate replace to='/dashboard' />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setEmailInvalid('');
      setPasswordInvalid('');
      if (email == '') {
        setEmailInvalid('Email is required');
        return;
      }
      if (password == '') {
        setPasswordInvalid('Password is required');
        return;
      }

      const { data } = await axios.post('/login', {
        email,
        password,
      });

      localStorage.setItem('at', data.data.token);
      localStorage.setItem('atu', JSON.stringify(data.data.user));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md={6}>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  {error != '' && <CAlert color='danger'>{error}</CAlert>}
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className='text-medium-emphasis'>Sign In to your account</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder='Email'
                        autoComplete='email'
                        onChange={(e) => setEmail(e.target.value)}
                        invalid={emailInvalid != ''}
                        feedbackInvalid={emailInvalid}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                        invalid={passwordInvalid != ''}
                        feedbackInvalid={passwordInvalid}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color='primary' className='px-4' type='submit'>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
