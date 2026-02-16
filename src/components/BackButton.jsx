// import React from 'react'
// import { Box, IconButton, Typography } from '@mui/material'
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate } from "react-router-dom";

// const BackButton = ({ label = "Back" }) => {
//     const navigate = useNavigate();

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#4f46e5', fontWeight: 600 }}>
//       <IconButton sx={{ color: '#4f46e5' }} onClick={() => navigate(-1)}>
//         <ArrowBackIcon />
//       </IconButton>
//       <Typography fontWeight={600}>{label}</Typography>
//     </Box>
//   )
// }

// export default BackButton


import { IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Typography fontWeight={600}>{label}</Typography>
    </Box>
  );
};

export default BackButton;
