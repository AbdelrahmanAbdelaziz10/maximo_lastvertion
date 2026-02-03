import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const DashboardCard = ({ title, value, change, footerText, positiveChange }) => {
  const theme = useTheme();

  return (
    <Card sx={{
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }
    }}>
      <CardContent sx={{ padding: '1.5rem' }}>
                <Typography variant="subtitle1" sx={{
          fontSize: '.9rem',
          fontWeight: 600,
          color: '#64748B'
        }}>
          {title}
        </Typography>
        <Typography variant="h2" sx={{
          fontSize: '2rem',
          fontWeight: 700,
          mb: '0.5rem',
        }}>
          {value}
        </Typography>

        {change && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            mt: '0.5rem',
            color: positiveChange ? 'success.main' : '#EF4444'
          }}>
            {positiveChange ? (
              <ArrowUpwardIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
            )}
            {change} change
          </Box>
        )}
      </CardContent>


      
      {footerText && (
        <Box sx={{
          backgroundColor: "var(--primary-color)",
          padding: '0.75rem 1rem',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          '& p': {
            m: 0,
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 500,
            textAlign: 'center'
          }
        }}>
          <Link to="#" style={{ textDecoration: 'none' }}>
            <Typography component="p">{footerText}</Typography>
          </Link>
        </Box>
      )}
    </Card>
  );
};

export default DashboardCard;