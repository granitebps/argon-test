import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import axios from 'axios';

const Summary = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('at');
        const { data } = await axios.get('/attendances/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data.data);
        setAttendances(
          data.data.map((a) => ({
            ...a,
            clock_in: `${a.date} ${a.clock_in}`,
            clock_out: `${a.date} ${a.clock_out}`,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Summary Attendance</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Masuk</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Pulang</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {attendances.map((a, i) => (
                  <CTableRow key={i}>
                    <CTableHeaderCell scope='row'>{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{a.clock_in}</CTableDataCell>
                    <CTableDataCell>{a.clock_out}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Summary;
