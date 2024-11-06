import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGround, fetchGrounds, updateGround } from '../redux/actions/groundActions';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';

const CreateGround = () => {
  const [groundEntries, setGroundEntries] = useState([
    {
      groundName: '',
      location: '',
      pricePerHour: '',
      availability: '',
      description: '',
      slots: [{ slotName: '', startTime: '', endTime: '' }] // Initial slot array
    },
  ]);

  const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [groundToEdit, setGroundToEdit] = useState(null); // Store the ID of the ground being edited

  const [showCreateForm, setShowCreateForm] = useState(false); // State to toggle form visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching existing grounds
  const groundState = useSelector((state) => state.grounds);
  console.log(groundState, "groundState:")
  const { grounds, loading, error } = groundState;
  let check = groundState.grounds.grounds;
  console.log(check, "checks:")

  useEffect(() => {
    debugger;
    dispatch(fetchGrounds())
      .catch((error) => {
        if (error.response.data.ReturnCode === 400) {
          navigate('/login'); // Redirect to login if 401 Unauthorized
        }
      });
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  // Handle ground input changes
  const onChange = (index, e) => {
    const newEntries = [...groundEntries];
    newEntries[index][e.target.name] = e.target.value;
    setGroundEntries(newEntries);
  };
  // Utility function to convert 12-hour time format to 24-hour time format
  // Utility function to convert 12-hour time format to 24-hour time format
  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours < 12) {
      hours += 12; // Convert PM hours
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 0 hours
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Handle slot input changes
  // Handle slot input changes
  const handleSlotChange = (groundIndex, slotIndex, e) => {
    const newEntries = [...groundEntries];

    if (e.target.name === 'startTime' || e.target.name === 'endTime') {
      const timeIn24HourFormat = convertTo24HourFormat(e.target.value);
      newEntries[groundIndex].slots[slotIndex][e.target.name] = timeIn24HourFormat;
    } else {
      newEntries[groundIndex].slots[slotIndex][e.target.name] = e.target.value;
    }

    setGroundEntries(newEntries);
  };

  // Add a new ground entry
  const addGroundEntry = () => {
    setGroundEntries((prev) => [
      ...prev,
      {
        groundName: '',
        location: '',
        pricePerHour: '',
        availability: '',
        description: '',
        slots: [{ slotName: '', startTime: '', endTime: '' }] // New ground with initial slot
      }
    ]);
  };

  // Remove a ground entry
  const removeGroundEntry = (index) => {
    if (groundEntries.length > 1) {
      const newEntries = [...groundEntries];
      newEntries.splice(index, 1);
      setGroundEntries(newEntries);
    }
  };

  // Add a new slot to a specific ground
  const addSlot = (groundIndex) => {
    const newEntries = [...groundEntries];
    newEntries[groundIndex].slots.push({ slotName: '', startTime: '', endTime: '' });
    setGroundEntries(newEntries);
  };

  // Remove a specific slot from a ground
  const removeSlot = (groundIndex, slotIndex) => {
    if (groundEntries[groundIndex].slots.length > 1) {
      const newEntries = [...groundEntries];
      newEntries[groundIndex].slots.splice(slotIndex, 1);
      setGroundEntries(newEntries);
    }
  };


  // Edit existing ground
  const editGround = (ground) => {
    setGroundEntries([ground]); // Populate form with the ground to edit
    setIsEditing(true);
    setGroundToEdit(ground._id);
    setShowCreateForm(true);
  };

  // Submit form to create grounds with slots
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   for (const entry of groundEntries) {
  //     await dispatch(createGround(entry));
  //   }
  //   alert("Grounds with slots created successfully!");
  //   setIsEditing(false);
  //   setGroundToEdit(null);
  //   dispatch(fetchGrounds());
  //   setShowCreateForm(false); // Hide form after submission and show existing grounds
  // };

  // Submit form to create or update grounds with slots
  const onSubmit = async (e) => {
    e.preventDefault();
    for (const entry of groundEntries) {
      if (isEditing) {
        // Call updateGround if in editing mode
        await dispatch(updateGround(entry)); // Pass ground ID and entry data
        alert("Ground updated successfully!");
      } else {
        // Call createGround if adding a new ground
        await dispatch(createGround(entry));
      }
    }
    setIsEditing(false);
    setGroundToEdit(null);
    dispatch(fetchGrounds());
    setShowCreateForm(false); // Hide form after submission and show existing grounds
  };

  return (
    <>
      <Header /> {/* Use Header component here */}
      <Box
        sx={{
          width: '600px',
          margin: 'auto',
          marginTop: '50px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#3f51b5' }}>
        {showCreateForm ? (isEditing ? "Edit Ground" : "Create a New Ground") : "View Existing Grounds"}
        </Typography>

        {/* Show existing grounds if the form is not visible */}
        {!showCreateForm && (
          <Box>
            {Array.isArray(check) && check.length > 0 ? (
              check.map((entry, groundIndex) => (
                <Box key={groundIndex} sx={{ marginBottom: '20px' }}>
                  <Typography variant="h6" gutterBottom>{`Ground ${groundIndex + 1}`}</Typography>
                  <Typography><strong>Ground Name:</strong> {entry.groundName}</Typography>
                  <Typography><strong>Location:</strong> {entry.location}</Typography>
                  <Typography><strong>Description:</strong> {entry.description}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Slots:</Typography>
                  {Array.isArray(entry.slots) && entry.slots.map((slot, slotIndex) => (
                    <Typography key={slotIndex}>
                      {`${slot.slotName} (${slot.startTime} - ${slot.endTime} - RS ${slot.price} )`}


                    </Typography>



                  ))}
                  <IconButton onClick={() => editGround(entry)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography>No grounds available.</Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCreateForm(true)} // Show form and hide existing grounds
              sx={{ marginTop: '20px' }}
            >
              Create Ground
            </Button>
          </Box>
        )}

        {/* Show the form if showCreateForm is true */}
        {showCreateForm && (
          <form onSubmit={onSubmit}>
            {groundEntries.map((entry, groundIndex) => (
              <Box key={groundIndex} sx={{ marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom>Ground {groundIndex + 1}</Typography>

                {/* Ground Details */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Ground Name"
                  variant="outlined"
                  name="groundName"
                  value={entry.groundName}
                  onChange={(e) => onChange(groundIndex, e)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Location"
                  variant="outlined"
                  name="location"
                  value={entry.location}
                  onChange={(e) => onChange(groundIndex, e)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={entry.description}
                  onChange={(e) => onChange(groundIndex, e)}
                  multiline
                  rows={4}
                  required
                />

                {/* Slot Details for the Ground */}
                <Typography variant="subtitle1" gutterBottom>Slots</Typography>
                {entry.slots.map((slot, slotIndex) => (
                  <Box key={slotIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Slot Name"
                      variant="outlined"
                      name="slotName"
                      value={slot.slotName}
                      onChange={(e) => handleSlotChange(groundIndex, slotIndex, e)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Price"
                      variant="outlined"
                      name="price"
                      value={slot.price}
                      onChange={(e) => handleSlotChange(groundIndex, slotIndex, e)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Start Time"
                      variant="outlined"
                      name="startTime"
                      type="time"
                      value={slot.startTime} // Ensure this is in "HH:mm" format
                      onChange={(e) => handleSlotChange(groundIndex, slotIndex, e)}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="End Time"
                      variant="outlined"
                      name="endTime"
                      type="time"
                      value={slot.endTime} // Ensure this is in "HH:mm" format
                      onChange={(e) => handleSlotChange(groundIndex, slotIndex, e)}
                      required
                    />

                    {/* Remove Slot Button */}
                    {entry.slots.length > 1 && (
                      <IconButton
                        onClick={() => removeSlot(groundIndex, slotIndex)}
                        color="secondary"
                        size="small"
                        sx={{ marginTop: '10px' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button
                  onClick={() => addSlot(groundIndex)}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ marginBottom: '10px' }}
                >
                  Add Slot
                </Button>

                {/* Remove Ground Button */}
                {groundEntries.length > 1 && (
                  <Button
                    onClick={() => removeGroundEntry(groundIndex)}
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    sx={{ marginTop: '10px' }}
                  >
                    Remove Ground
                  </Button>
                )}
              </Box>
            ))}
            <Button
            onClick={addGroundEntry}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ marginBottom: '20px', display: isEditing ? 'none' : 'block' }} // Only show if not editing
          >
            Add Another Ground
          </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? "Update" : "Submit"}  // Change button text based on editing state
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default CreateGround;
