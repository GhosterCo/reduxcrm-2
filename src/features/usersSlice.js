import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const POST_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const savedUsers = localStorage.getItem('users');
  if (savedUsers) {
    return JSON.parse(savedUsers);
  }

  const response = await axios.get(POST_URL);
  // const response = await axios.get(`${POST_URL}?_start=${USERS_START}&_limit=${USERS_PER_PAGE}`);
  localStorage.setItem('users', JSON.stringify(response.data)); 
  return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const localUsers = JSON.parse(localStorage.getItem("users")) || [];
  const newUserId = newUser.id;

  const updatedUsers = [...localUsers, { id: newUserId, ...newUser }];
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return { id: newUserId, ...newUser };
});

export const editUser = createAsyncThunk("users/editUser", async (updatedUser) => {
  if (typeof updatedUser.id === "string") {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    const updatedUsers = localUsers.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return updatedUser; 
  }

  const response = await axios.put(`${POST_URL}/${updatedUser.id}`, updatedUser);

  const localUsers = JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = localUsers.map((user) =>
    user.id === updatedUser.id ? response.data : user
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`${POST_URL}/${id}`);
  let savedUsers = JSON.parse(localStorage.getItem('users'));
  savedUsers = savedUsers.filter(user => user.id !== id);
  localStorage.setItem('users', JSON.stringify(savedUsers));
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    deletedUsers: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        
        state.users = [...action.payload, ...localUsers];
        state.users = action.payload.filter(
          (user) => !state.deletedUsers.includes(user.id)
        ); 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; 
        }
      })

      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedUsers.push(action.payload); 
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
