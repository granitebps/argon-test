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
  CImage,
  CButton,
} from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('mat');
        const { data } = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data.data);
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
            <strong>Users</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope='col'>#</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Nama</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Email</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Posisi</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Handphone</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Foto</CTableHeaderCell>
                  <CTableHeaderCell scope='col'>Aksi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((a, i) => (
                  <CTableRow key={i}>
                    <CTableHeaderCell scope='row'>{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{a.name}</CTableDataCell>
                    <CTableDataCell>{a.email}</CTableDataCell>
                    <CTableDataCell>{a.position}</CTableDataCell>
                    <CTableDataCell>{a.phone}</CTableDataCell>
                    <CTableDataCell>
                      <CImage
                        rounded
                        thumbnail
                        src={`${process.env.REACT_APP_API_URL}/${a.image}`}
                        width={50}
                        height={50}
                        className='mt-3'
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color='primary'
                        onClick={() =>
                          navigate(`/users/${a.id}`, {
                            replace: true,
                          })
                        }
                      >
                        Update
                      </CButton>
                    </CTableDataCell>
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

export default Users;
