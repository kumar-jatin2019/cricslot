// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGrounds , updateGround } from '../redux/actions/groundActions';
import Header from './Header/Header';
import GroundCard from './GroundCard';
import { useNavigate } from 'react-router-dom';
import './GroundCard.css';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { grounds, loading, error } = useSelector(state => state.grounds);

  useEffect(() => {
    dispatch(fetchUserGrounds())
      .catch((error) => {
        if (error.response.data.ReturnCode === 400) {
          navigate('/login'); // Redirect to login if 401 Unauthorized
        }
      });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Ensure `grounds` is an array
  const groundsArray = Array.isArray(grounds) ? grounds : [];
  console.log(groundsArray, "userGrounds");

  return (
    <div>
      <Header />
      <h1>Available Grounds</h1>
      <div className="ground-grid" >
        {groundsArray.map(ground => (
          <GroundCard key={ground.id} ground={ground} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
