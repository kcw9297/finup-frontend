import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button, IconButton, Stack} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';


export default function Footer() {

  // 하단 아이콘 리스트
  const iconList = [ GitHubIcon, TwitterIcon, LinkedInIcon, YouTubeIcon]

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e0e0e0',
        py: 2,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">

        {/* Copyright & Social */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5, whiteSpace: 'pre-line', textAlign: 'left' }}  >
              {`Copyright © 2025 FinUp All Right Reservered.
                Some Additional Text
                Some Additional Text`}
            </Typography>

          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {iconList.map((Icon, idx) => (
              <IconButton  key={idx} size="small" color="inherit" sx={{ p: 0.5 }}>
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
