import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',   
      justifyContent: 'center', 
      height: '100vh',         
      color: '#52b788',        
    }}>
      <CircularProgress size={60} color="inherit" />  
      <Typography variant="h4" sx={{ mt: 3, fontFamily: 'Comic Sans MS', color: 'inherit' }}>
        Getting your music!
      </Typography>
    </Box>
  );
}
