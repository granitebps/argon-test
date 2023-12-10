import React, { useEffect, useState } from 'react';
import {
  CButton,
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
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

const now = new Date();
const startMonth = new Date().setDate(1);

const Summary = () => {
  const [attendances, setAttendances] = useState([]);
  const [dates, setDates] = useState([startMonth, now]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('at');
        const { data } = await axios.get('/attendances/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleFilter = async () => {
    let start = new Date();
    let end = new Date();
    start.setDate(1);
    if (dates) {
      start = new Date(dates[0]);
      end = new Date(dates[1]);
    }
    const payload = {
      start: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
      end: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
    };

    try {
      const searchParams = new URLSearchParams(payload);
      const token = localStorage.getItem('at');
      const { data } = await axios.get(`/attendances/summary?${searchParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className='mb-4'>
          <CCardHeader>
            <strong>Summary Attendance</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={6}>
                <DateRangePicker
                  onChange={setDates}
                  value={dates}
                  showLeadingZeros
                  format='y-MM-dd'
                  rangeDivider=' to '
                />
              </CCol>
              <CCol>
                <CButton color='primary' onClick={handleFilter}>
                  Filter
                </CButton>
              </CCol>
            </CRow>

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
