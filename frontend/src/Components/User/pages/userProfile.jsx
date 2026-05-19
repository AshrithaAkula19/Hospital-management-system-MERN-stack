import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

import axios from "axios";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({});

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");

  // ================= FETCH USER =================

  const fetch_user = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/userdetails",
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      );

      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_user();
  }, [isEditing]);

  useEffect(() => {
    setUserName(user?.username || "");
    setUserEmail(user?.email || "");
    setUserContact(user?.phone || "");
    setUserAddress(user?.location || "");
    setUserGender(user?.gender || "");
    setUserAge(user?.age || "");
  }, [user]);

  // ================= SAVE =================

  const handleSaveClick = async () => {
    try {
      await axios.put(
        "http://localhost:8080/updatepatient",
        {
          username: userName,
          email: userEmail,
          password: userPassword,
          phone: userContact,
          location: userAddress,
          age: userAge,
          gender: userGender,
        },
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      );

      toast.success("Profile Updated Successfully");

      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  // ================= CANCEL =================

  const handleCancelClick = () => {
    setIsEditing(false);

    setUserName(user?.username || "");
    setUserEmail(user?.email || "");
    setUserContact(user?.phone || "");
    setUserAddress(user?.location || "");
    setUserGender(user?.gender || "");
    setUserAge(user?.age || "");
  };

  // ================= UI =================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8fbff 50%, #ffffff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: "30px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(37,99,235,0.12)",
          }}
        >
          {/* TOP SECTION */}

          <Box
            sx={{
              background:
                "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              p: 5,
              textAlign: "center",
              color: "white",
              position: "relative",
            }}
          >
            <Avatar
              sx={{
                width: 110,
                height: 110,
                margin: "0 auto",
                mb: 2,
                background: "white",
                color: "#2563eb",
                fontSize: "42px",
                fontWeight: "bold",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              {userName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontFamily: "Poppins",
              }}
            >
              Patient Profile
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
                fontSize: "16px",
              }}
            >
              Manage your hospital account information
            </Typography>
          </Box>

          {/* FORM SECTION */}

          <Box sx={{ p: 5 }}>
            <Grid container spacing={4}>

              {/* NAME */}

              <Grid item xs={12} md={6}>
                <Typography sx={labelStyle}>
                  <Person sx={iconStyle} />
                  Full Name
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={fieldStyle}
                  />
                ) : (
                  <Typography sx={valueStyle}>
                    {userName}
                  </Typography>
                )}
              </Grid>

              {/* EMAIL */}

              <Grid item xs={12} md={6}>
                <Typography sx={labelStyle}>
                  <Email sx={iconStyle} />
                  Email Address
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    sx={fieldStyle}
                  />
                ) : (
                  <Typography sx={valueStyle}>
                    {userEmail}
                  </Typography>
                )}
              </Grid>

              {/* PHONE */}

              <Grid item xs={12} md={6}>
                <Typography sx={labelStyle}>
                  <Phone sx={iconStyle} />
                  Contact Number
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    value={userContact}
                    onChange={(e) => setUserContact(e.target.value)}
                    sx={fieldStyle}
                  />
                ) : (
                  <Typography sx={valueStyle}>
                    {userContact}
                  </Typography>
                )}
              </Grid>

              {/* ADDRESS */}

              <Grid item xs={12} md={6}>
                <Typography sx={labelStyle}>
                  <LocationOn sx={iconStyle} />
                  Address
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    sx={fieldStyle}
                  />
                ) : (
                  <Typography sx={valueStyle}>
                    {userAddress}
                  </Typography>
                )}
              </Grid>

              {/* AGE */}

              <Grid item xs={12} md={6}>
                <Typography sx={labelStyle}>
                  Age
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    type="number"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    sx={fieldStyle}
                  />
                ) : (
                  <Typography sx={valueStyle}>
                    {userAge}
                  </Typography>
                )}
              </Grid>

              {/* GENDER */}

              <Grid item xs={12} md={6}>
                <Typography sx={labelStyle}>
                  Gender
                </Typography>

                {isEditing ? (
                  <RadioGroup
                    row
                    value={userGender}
                    onChange={(e) => setUserGender(e.target.value)}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />

                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                ) : (
                  <Typography sx={valueStyle}>
                    {userGender}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 5 }} />

            {/* BUTTONS */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                  sx={editButtonStyle}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveClick}
                    sx={saveButtonStyle}
                  >
                    Save Changes
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancelClick}
                    sx={cancelButtonStyle}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

// ================= STYLES =================

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  mb: 1.5,
  fontWeight: 600,
  color: "#0f172a",
  fontFamily: "Poppins",
};

const iconStyle = {
  color: "#2563eb",
};

const valueStyle = {
  background: "#f8fafc",
  padding: "16px",
  borderRadius: "14px",
  color: "#475569",
  fontSize: "15px",
  border: "1px solid #e2e8f0",
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "#fff",
  },
};

const editButtonStyle = {
  background:
    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  borderRadius: "14px",
  padding: "12px 28px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "15px",
  boxShadow: "0 10px 25px rgba(37,99,235,0.2)",
};

const saveButtonStyle = {
  background:
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  borderRadius: "14px",
  padding: "12px 28px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "15px",
  boxShadow: "0 10px 25px rgba(16,185,129,0.2)",
};

const cancelButtonStyle = {
  borderRadius: "14px",
  padding: "12px 28px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "15px",
};

export default UserProfile;