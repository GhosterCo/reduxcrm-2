import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/usersSlice";

import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TableSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  const [openDeleteModal, setDeleteModal] = useState(false);
  const [idDeleteModal, setIdDeleteModal] = useState();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  // const fetchMoreData = () => {
  //   console.log('fetch');
  //   dispatch(fetchUsers());
  // };

  const handleEdit = user => {
    navigate("/edit", { state: { user } });
  };

  const handleDelete = id => {
    setDeleteModal(true);
    setIdDeleteModal(id);
  };

  const handleSureDelete = async id => {
    try {
      await dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteModal(false);
    }
  };

  if (status === "loading" && users.length === 0) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate("/add")}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={user.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='inherit'
                    onClick={() => handleEdit(user)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant='contained'
                    color='inherit'
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    
      </TableContainer>

      <Modal
        open={openDeleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Are you sure?
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            to delete user?
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant='contained'
              color='error'
              onClick={() => handleSureDelete(idDeleteModal)}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
