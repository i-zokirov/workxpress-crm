import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// react-router-dom components
import {  useNavigate, useLocation  } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { authenticateUser } from "redux/actions/userActions";

const SignIn = () => {
  const location = useLocation();
  
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const {loading, error, authenticated} = useSelector(state => state.auth) 

  const handleInputChange = (e) => {
    if(e.target.type === "email"){
      setEmail(e.target.value)
    }else {
      setPassword(e.target.value)
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleFormSubmit = () => {
    if(email && password){
      dispatch(authenticateUser(email, password))
    }
  }


  useEffect(() => {
    if(authenticated){
      navigate("/dashboard")
    }
  },[authenticated])

  return (
    <BasicLayout image={bgImage}>
      {error && <MDAlert style={{marginBottom: "30px"}} color="error" dismissible>{error}</MDAlert>}
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={handleInputChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth value={password} onChange={handleInputChange} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              {!loading ? <MDButton variant="gradient" color="info" fullWidth onClick={handleFormSubmit}>
                sign in
              </MDButton> 
              :  
              <LoadingButton 
                  fullWidth 
                  loadingPosition="start"
                  startIcon={<SaveIcon />} 
                  loading  
                  variant="outlined"
                  >
                  SIGN IN
              </LoadingButton>
              }
              
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
