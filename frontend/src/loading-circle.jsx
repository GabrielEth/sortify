import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Import Typography for text

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',  // Stack the progress circle and text vertically
      alignItems: 'center',     // Center align items horizontally
      justifyContent: 'center', // Center align items vertically
      height: '100vh',          // Take full viewport height
    }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}> // Add some margin top for spacing
        Importing user's Spotify data...
      </Typography>
    </Box>
  );
}
