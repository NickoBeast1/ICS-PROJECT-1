import React from 'react';
import './style.css';

const Sidebar = ({ handleLogout }) => {
  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <span>Helpy</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <button  className='list-group-item py-2'>
          <i className='bi bi-speedometer2 fs-5 me-3'></i>
          <span>Dashboard</span>
        </button>
        <button  className='list-group-item py-2'>
          <i className='bi bi-house fs-5 me-3'></i>
          <span>Home</span>
        </button>
        <button className='list-group-item py-2'>
          <i className='bi bi-table fs-5 me-3'></i>
          <span>Products</span>
        </button>
        <button a className='list-group-item py-2'>
          <i className='bi bi-clipboard-data fs-5 me-3'></i>
          <span>Report</span>
        </button>
        <button  className='list-group-item py-2'>
          <i className='bi bi-people fs-5 me-3'></i>
          <span>Customers</span>
        </button>
        <button className='list-group-item py-2' onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <i className='bi bi-power fs-5 me-3'></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
