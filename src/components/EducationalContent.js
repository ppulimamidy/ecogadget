import React from 'react';
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const articles = [
  {
    title: 'What is E-Waste?',
    content: 'Electronic waste, or e-waste, is a term for electronic products that have become unwanted, non-working or obsolete...',
    link: 'https://example.com/article1',
  },
  {
    title: 'Why Should We Recycle E-Waste?',
    content: 'E-waste contains many valuable, recoverable materials such as aluminum, copper, gold, silver, plastics, and ferrous metals...',
    link: 'https://example.com/article2',
  },
  // Add more articles as needed
];

const EducationalContent = () => {
  return (
    <Box>
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => window.open(article.link, "_blank")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default EducationalContent;
