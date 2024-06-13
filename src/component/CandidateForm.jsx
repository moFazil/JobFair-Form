import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Button, Grid, Box, CircularProgress, Stack } from "@mui/material";
import {
  Hidden,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";

const containerStyle = "mx-auto  bg-white  rounded-lg";
const headerStyle = "text-center mb-20 mr-2 px-2";
const shareButtonStyle = "float-right mt-2 ";

const inputOutlineColor = "black"; // Define the outline color here

function CandidateForm() {
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    academicQualification: "",
    collegeName: "",
    percentage: "",
    skills: "",
    experiencebox: false,
    experience: "",
    Completion: false,
    certification: "",
    gender: "",
    dob: "",
    address: "",
    jobrole: "",
    slot: "",
    resume: null,
  };

  const [error, setError] = useState(null);

  const history = useNavigate();

  const [formData, setFormData] = useState(initialState); // Initialize form data with the initial state
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue =
      type === "checkbox" ? checked : value === "on" ? true : value;
    setFormData({ ...formData, [name]: newValue });

    // Update the selected slot when the slot field changes
    if (name === "slot") {
      setSelectedSlot(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    // Validate other form fields here
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.mobile === "" ||
      formData.academicQualification === "" ||
      formData.collegeName === "" ||
      formData.percentage === "" ||
      formData.skills === "" ||
      formData.gender === "" ||
      formData.dob === "" ||
      formData.address === "" ||
      formData.jobrole === "" ||
      formData.resume === null
    ) {
      setError("Please fill in all required fields.");
      setIsLoading(false); // Reset loading state to false
      return;
    }

    // Check if the selected slot is available
    if (!availableSlots.includes(formData.slot)) {
      setError(
        "The selected slot is not available. Please choose another slot."
      );
      setIsLoading(false); // Reset loading state to false
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post(
        "https://jobapi.abhiseducampus.com/api/candidates",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the list of booked slots
      setBookedSlots([...bookedSlots, formData.slot]);

      // Remove the selected slot from available slots
      setAvailableSlots((prevSlots) =>
        prevSlots.filter((slot) => slot !== formData.slot)
      );

      history(
        `/success?name=${formData.name}&email=${formData.email}&slot=${formData.slot}`
      );
    } catch (error) {
      console.error("Error submitting candidate information:", error);
      if (error.response && error.response.status === 400) {
        setError("Bad Request: Please check your input data.");
      } else {
        setError(
          "An error occurred while submitting the data. Please try again later."
        );
      }
    } finally {
      setIsLoading(false); // Reset loading state to false
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: "https://whytap.in/job-fair/",
        })
        .then(() => {
          console.log("Page shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing page:", error);
        });
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Web Share API is not supported in this browser.");
    }
  };

  useEffect(() => {
    axios
      .get("https://jobapi.abhiseducampus.com/api/candidates/slots")
      .then((response) => {
        console.log("Available slots:", response.data.availableSlots);
        setAvailableSlots(response.data.availableSlots || []); // Initialize with an empty array if no slots are available
        setBookedSlots(response.data.bookedSlots || []); // Initialize with an empty array if no slots are booked

        // Log the number of available slots
        console.log(
          "Number of available slots:",
          response.data.availableSlots.length
        );
      })
      .catch((error) => {
        console.error("Error fetching available slots:", error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <div className={containerStyle}>
        <Hidden>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={logo} alt="Logo" width="120" />
          </div>
        </Hidden>
        <div className="">
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            className={headerStyle}
          >
            Registration Form
            <Button
              variant="outlined"
              component="span"
              style={{ borderColor: "#861B47", color: "#861B47" }}
              className={shareButtonStyle}
              onClick={handleShare} // Add onClick handler for the share button
            >
              Share
            </Button>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack
              sx={{
                "& label.Mui-focused": {
                  color: "black",
                }, //styles the label
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > :not(style)": { m: 1 },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // Set the default outline color to black
                    },
                    "&:hover:not(.Mui-disabled) fieldset": {
                      borderColor: "#861B47", // Set the outline color to #861B47 on hover
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#861B47", // Set the outline color to yellow on focus
                    },
                  },
                }}
              >
                <Grid container columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      id="name"
                      name="name"
                      variant="outlined"
                      margin="normal"
                      required
                      className=" focus:text-black"
                      value={formData.name}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile"
                      type="number"
                      id="mobile"
                      name="mobile"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Academic Qualification"
                      id="academicQualification"
                      name="academicQualification"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.academicQualification}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="College Name"
                      id="collegeName"
                      name="collegeName"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.collegeName}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Percentage"
                      type="number"
                      id="percentage"
                      name="percentage"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.percentage}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Skills"
                      id="skills"
                      name="skills"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.skills}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>
                      <input
                        type="checkbox"
                        name="experiencebox"
                        checked={formData.experiencebox}
                        onChange={handleInputChange}
                      />{" "}
                      Do you have any experience?
                    </label>
                  </Grid>
                  {formData.experiencebox && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Job Role with Experience"
                        id="experience"
                        name="experience"
                        variant="outlined"
                        margin="normal"
                        value={formData.experience}
                        onChange={handleInputChange}
                        InputProps={{
                          style: { borderColor: inputOutlineColor },
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <label>
                      <input
                        type="checkbox"
                        name="Completion"
                        checked={formData.Completion}
                        onChange={handleInputChange}
                      />{" "}
                      Do you have any Course Completion Certificates?
                    </label>
                  </Grid>
                  {formData.Completion && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Course and Organisation Name"
                        id="certification"
                        name="certification"
                        variant="outlined"
                        margin="normal"
                        required
                        value={formData.certification}
                        onChange={handleInputChange}
                        InputProps={{
                          style: { borderColor: inputOutlineColor },
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="gender">Gender</InputLabel>
                      <Select
                        label="Gender"
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={{ borderColor: inputOutlineColor }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      id="dob"
                      name="dob"
                      type="date"
                      variant="outlined"
                      margin="normal"
                      required
                      InputLabelProps={{ shrink: true }}
                      value={formData.dob}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      id="address"
                      name="address"
                      variant="outlined"
                      margin="normal"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { borderColor: inputOutlineColor },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="jobrole">Job Role</InputLabel>
                      <Select
                        label="Job Role"
                        id="jobrole"
                        name="jobrole"
                        required
                        value={formData.jobrole}
                        onChange={handleInputChange}
                        style={{
                          borderColor: inputOutlineColor,
                          color: "black",
                        }}
                      >
                        <MenuItem value="wordpress developer">
                          Wordpress Developer
                        </MenuItem>
                        <MenuItem value="digital marketing executive">
                          Digital Marketing Executive
                        </MenuItem>
                        <MenuItem value="front end developer">
                          Front End Developer
                        </MenuItem>
                        <MenuItem value="back end developer">
                          Back End Developer
                        </MenuItem>
                        <MenuItem value="flutter developer">
                          Flutter Developer
                        </MenuItem>
                        <MenuItem value="tele counsellor">
                          Tele Counsellor
                        </MenuItem>
                        <MenuItem value="3d animator">3D Animator</MenuItem>
                        <MenuItem value="graphic designer">
                          Graphic Designer
                        </MenuItem>
                        <MenuItem value="field sales executive">
                          Field Sales Executive
                        </MenuItem>
                        <MenuItem value="accounts executive">
                          Accounts Executive
                        </MenuItem>
                        <MenuItem value="php developer">PHP Developer</MenuItem>
                        <MenuItem value="backend executive">
                          Backend Executive
                        </MenuItem>
                        <MenuItem value="telecalling executive">
                          Telecalling Executive
                        </MenuItem>
                        <MenuItem value="full stack trainer">
                          Full Stack Trainer
                        </MenuItem>
                        <MenuItem value="digital marketing trainer">
                          Digital Marketing Trainer
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="slot">Slot</InputLabel>
                      <Select
                        label="Slot"
                        id="slot"
                        name="slot"
                        required
                        value={formData.slot}
                        onChange={handleInputChange}
                        style={{ borderColor: inputOutlineColor }}
                      >
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <MenuItem
                              key={slot}
                              value={slot}
                              disabled={bookedSlots.includes(slot)}
                            >
                              {slot}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="">No slots available</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* <Typography variant="subtitle1" gutterBottom>
                  Upload Your Resume
                </Typography>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  name="resume"
                  required
                  onChange={handleFileChange}
                  className="w-full"
                  // style={{ display: "none" }}
                  id="resumeInput"
                /> */}
                  <div className="w-full h-32 grid grid-cols-1 items-center   xs:pl-6 md:pl-6">
                    <div>
                      <label className="flex flex-row gap-1">
                        <span className="text-lg font-medium text-gray-700">
                          {" "}
                          Upload Your Resume
                        </span>
                        <span className="text-red-500 text-3xl font-medium">
                          *
                        </span>
                      </label>
                    </div>
                    <input
                      required
                      name="image"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={handleFileChange}
                      className="relative m-0 block w-full h-14 min-w-0 flex-auto cursor-pointer rounded border border-solid border-black bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-800 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-[#861B47] file:px-2 file:h-14 file:text-white file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-[#861B47] focus:border-[#861B47] focus:bg-white focus:text-black focus:shadow-[0_0_0_1px] focus:shadow-[#861B47] focus:outline-none "
                      type="file"
                    />
                  </div>
                  {/* <label htmlFor="resumeInput" style={{ marginBottom: "16px" }}>
                  <Button
                    variant="outlined"
                    component="span"
                    style={{
                      borderColor: inputOutlineColor,
                      color: inputOutlineColor,
                    }}
                    fullWidth
                  >
                    Choose File
                  </Button>
                </label>
                {formData.resume && (
                  <Typography variant="body2" gutterBottom >
                    Selected file: {formData.resume.name}
                  </Typography>
                )} */}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        backgroundColor: "#861B47",
                        color: "#ffffff", // Change to your desired font color
                        borderRadius: "20px", // Makes the button rounded
                        height: "40px", // Decrease the button height
                        margin: "20px 0 20px 0",
                      }}
                      disabled={isLoading} // Disable the button when loading is true
                    >
                      {isLoading ? <CircularProgress size={28} /> : "Submit"}
                    </Button>
                  </Grid>
                  {error && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Stack>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default CandidateForm;
