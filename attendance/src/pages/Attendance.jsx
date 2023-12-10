import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('at');
        const { data } = await axios.get('/attendances/today', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.data) {
          setAttendance(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  const handleAttendance = async (type) => {
    try {
      const token = localStorage.getItem('at');
      const time = new Date();
      const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
      const minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      const second = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
      const payload = {
        ...attendance,
        [type]: `${hour}:${minute}:${second}`,
      };
      const { data } = await axios.post('/attendances', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDate = (date) => {
    const res = new Date(date);
    res.setHours(0, 0, 0, 0);
    return res.toDateString();
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Record Attendance</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className='mb-3'>
              <CCol>Date</CCol>
              <CCol>{handleDate(attendance.date) || new Date().toDateString()}</CCol>
            </CRow>
            <CRow className='mb-3'>
              <CCol>Clock In</CCol>
              <CCol>
                {attendance.clock_in || (
                  <CButton color='primary' size='sm' onClick={async () => await handleAttendance('clock_in')}>
                    Clock In
                  </CButton>
                )}
              </CCol>
            </CRow>
            <CRow className='mb-3'>
              <CCol>Clock Out</CCol>
              <CCol>
                {attendance.clock_out || (
                  <CButton color='primary' size='sm' onClick={async () => await handleAttendance('clock_out')}>
                    Clock Out
                  </CButton>
                )}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Attendance;
