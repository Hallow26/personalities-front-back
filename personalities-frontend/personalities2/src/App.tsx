import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [personalityList, setPersonalityList] = useState<any[]>([]); // Array to store fetched data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle error state

  const hasNext = index < personalityList.length - 1;
  const hasPrev = index > 0;

  useEffect(() => {
    // Fetch the personalities from backend
    fetch('http://localhost:8080/baluyut/personalities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        setPersonalityList(data);
        setLoading(false); // Done loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load personalities');
        setLoading(false); // Done loading even if there's an error
      });
  }, []);

  function handleNextClick() {
    setIndex(hasNext ? index + 1 : 0);
  }

  function handlePrevClick() {
    setIndex(hasPrev ? index - 1 : personalityList.length - 1);
  }

  // Show loading message while fetching data
  if (loading) {
    return <Typography variant="h6" align="center"><CircularProgress /></Typography>;
  }

  // Show error message if there's an error fetching data
  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
        <Button onClick={() => window.location.reload()} variant="contained" color="primary">
          Retry
        </Button>
      </Typography>
    );
  }

  // If no data available, show a message
  if (personalityList.length === 0) {
    return <Typography variant="h6" align="center">No data available yet.</Typography>;
  }

  // Default to the first personality if list is empty
  let personality = personalityList[index] || { name: 'Unknown', trait: 'Unknown', description: 'No description available.', imageUrl: '' };

  return (
    <>
      <Typography variant="h5" align="center" sx={{ mt: 2 }}>
        Music Artist Gallery
      </Typography>
      <Card sx={{ maxWidth: 345, margin: 'auto', mt: 4 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: blue[600] }}>{personality.name ? personality.name[0] : '?'}</Avatar>}
          title={personality.name}
          subheader={personality.trait}
        />
        <CardMedia>
          {personality.url ? ( // Check for `url` instead of `imageUrl`
            <img
              height="194"
              src={personality.url}
              alt={personality.name}
            />
          ) : (
            <div
              style={{
                height: '194px',
                width: '100%',
                background: '#E0E0E0',
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
            >
              No Image Available
            </div>
          )}
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {personality.description?.substring(0, 200) || "No description available."}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handlePrevClick} aria-label="previous" sx={{ color: 'white' }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography>({index + 1} of {personalityList.length})</Typography>
          <IconButton onClick={handleNextClick} aria-label="next" sx={{ color: 'white' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}