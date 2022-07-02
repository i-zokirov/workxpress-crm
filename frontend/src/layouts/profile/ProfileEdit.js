import React from 'react'
import Modal from 'components/MUIModal'
import MDTypography from 'components/MDTypography'
import MDBox from 'components/MDBox'
import MDAvatar from 'components/MDAvatar'
import colors from "assets/theme/base/colors"
import MDInput from 'components/MDInput'
import {Grid, Container} from '@mui/material'

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from '@mui/icons-material/Telegram';
import MDButton from 'components/MDButton'

const iconBoxStyle = {
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        width: "50px",
                        color: "white",
                        fontSize: "35px"
}

const ProfileEdit = ({open, onClose, user}) => {
  const { socialMediaColors } = colors;
    return (
        <Modal open={open} onClose={onClose} title="profile-edit" description="edit profile data">
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Edit profile data
            </MDTypography>

            <MDBox>
                <MDAvatar src="https://bit.ly/34BY10g" alt="Avatar" size="xxl" />
            </MDBox>
            
            <Grid container spacing={2} sx={{marginTop: "2px"}}>
                <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <MDInput type="text" label="Full name" value={user.name} disabled style={{width: "90%"}}/>
                </Grid>

                <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <MDInput type="email" label="Email" value={user.email} disabled style={{width: "90%"}}/>
                </Grid>
                <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <MDInput type="text" label="Role" value={user.role} disabled style={{width: "90%"}}/>
                </Grid>
                <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <MDInput type="date" label="Birthdate" value="2000-05-03"  style={{width: "90%"}}/>
                </Grid>
                <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <MDInput type="tel" label="Mobile Phone" value={user.mobilePhoneNumber}  style={{width: "90%"}}/>
                </Grid>
                <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
                    <MDInput type="tel" label="Secondary Phone" value={user.homeTelephoneNumber}  style={{width: "90%"}}/>
                </Grid>


                <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
                    <MDBox 
                        color={socialMediaColors.telegram.main}
                        borderRadius="50%"
                        sx={iconBoxStyle}>
                            <TelegramIcon/>
                        </MDBox> 
                    <MDInput variant="standard" type="url" label="Telegram URL" style={{width: "85%"}} />
                </Grid>
                <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
                    <MDBox 
                        color={socialMediaColors.facebook.main}
                        borderRadius="50%"
                        sx={iconBoxStyle}>
                            <FacebookIcon/>
                        </MDBox> 
                    <MDInput variant="standard" type="url" label="Facebook URL" style={{width: "85%"}} />
                </Grid>
                <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
                    <MDBox 
                        color={socialMediaColors.instagram.main}
                        borderRadius="50%"
                        sx={iconBoxStyle}>
                            <InstagramIcon/>
                        </MDBox> 
                    <MDInput variant="standard" type="url" label="Instagram URL" style={{width: "85%"}} />
                </Grid>
            </Grid>

            <Container sx={
                {
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "right"
                }
                }>
                <MDBox sx={{paddingRight: "5px"}}>
                    <MDButton variant="gradient" color="primary" size="medium">Save</MDButton>
                </MDBox>
                <MDBox >
                    <MDButton  variant="gradient" color="secondary" size="medium" onClick={onClose}>Cancel</MDButton>
                </MDBox>
            </Container>
        </Modal>
        
    )
}

export default ProfileEdit