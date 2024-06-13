import React from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";

function SuccessPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name");
  const email = queryParams.get("email");
  const slot = queryParams.get("slot");

  const handleGoBack = () => {
    window.location.href = "https://whytap.in/job-fair/";
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
      alert("Web Share API is not supported in this browser.");
    }
  };

  const iconColor = "#861B47";
  const buttonColor = "#861B47";
  const color = " text-[#861B47]";
  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card>
            <CardHeader
              title="Congratulations!"
              subheader="You have successfully submitted your information."
              titleTypographyProps={{
                variant: "h4",
                component: "h2",
                sx: {
                  fontSize: { xs: "2rem", sm: "2.8rem" },
                  fontWeight: 700,
                  borderBottom: "1px solid gray",
                  paddingBottom: "10px",
                  paddingTop: "20px",
                },
              }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <span className=" font-bold font-serif pl-2">
                  Candidate Name :{" "}
                </span>{" "}
                {name}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <span className="font-bold font-serif pl-2">Email : </span>{" "}
                {email ? email : "Email not provided"}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <span className="font-bold font-serif pl-2">Slot : </span>{" "}
                {slot}
              </Typography>
              {/* Additional styling for location, phone, and email */}
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="ml-2 pb-3">
                  <LocationOnIcon
                    color="primary"
                    sx={{ color: iconColor }}
                    className=" mr-1"
                  />
                  <span className="font-bold">Location</span> <br />
                  <p className=" pl-7">3RD FLOOR, NEW NO. 75, 77 & 79,</p>
                  <p className=" pl-7"> Lohmanradhri Tower, Pantheon Road,</p>
                  <p className=" pl-7"> Egmore, Chennai, Tamil Nadu, 600008.</p>
                </Typography>
              </div>
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="ml-2 pb-3">
                  <PhoneIcon
                    color="primary"
                    sx={{ color: iconColor }}
                    className=" mr-1"
                  />
                  <span className="font-bold">Phone</span> <br />
                  <p className=" pl-7"> 82700 99991 / 82700 99994 </p>
                </Typography>
              </div>
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="ml-2 pb-3">
                  <EmailIcon
                    color="primary"
                    sx={{ color: iconColor }}
                    className=" mr-1"
                  />
                  <span className="font-bold">Email</span> <br />
                  <p className=" pl-7"> contact@whytap.in</p>
                </Typography>
              </div>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", mb: 4 }}
                className=" flex justify-center mt-5"
              >
                Don't forget to bring your resume!
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Button
                    variant="contained"
                    onClick={handleGoBack}
                    fullWidth
                    sx={{ backgroundColor: buttonColor }}
                  >
                    Go Back
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShare}
                    fullWidth
                    sx={{ backgroundColor: buttonColor }}
                  >
                    Share
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SuccessPage;
