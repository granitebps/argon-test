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
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem('aat');
    if (!authToken) {
      return navigate('/', { replace: true });
    }

    const auth = JSON.parse(localStorage.getItem('aatu'));
    setUser(auth);
    setPhone(auth.phone);
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    setError('');
    setSuccess('');
    e.preventDefault();
    try {
      if (phone == '') {
        setPhoneInvalid('Phone is required');
        return;
      }

      const formData = new FormData();
      formData.append('phone', phone);
      if (image) {
        formData.append('image', image);
      }
      if (password != '') {
        formData.append('password', password);
      }

      const token = localStorage.getItem('aat');
      const { data } = await axios.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.data);
      localStorage.setItem('aatu', JSON.stringify(data.data));
      setSuccess('You have successfully update your profile');
      setPassword('');
    } catch (error) {
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
            <strong>Update Profile</strong>
          </CCardHeader>
          <CCardBody>
            {error != '' && <CAlert color='danger'>{error}</CAlert>}
            {success != '' && (
              <CAlert color='success' dismissible>
                {success}
              </CAlert>
            )}
            <CForm onSubmit={handleUpdateProfile}>
              <div className='mb-3'>
                <CFormLabel>Name</CFormLabel>
                <CFormInput defaultValue={user.name} disabled />
              </div>
              <div className='mb-3'>
                <CFormLabel>Email</CFormLabel>
                <CFormInput defaultValue={user.email} disabled />
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
                <CFormInput defaultValue={user.position} disabled />
              </div>
              <div className='mb-3'>
                <CFormLabel>Phone Number</CFormLabel>
                <CFormInput
                  defaultValue={phone}
                  invalid={phoneInvalid != ''}
                  feedbackInvalid={phoneInvalid}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <CFormLabel>Change Password</CFormLabel>
                <CFormInput type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default Profile;
