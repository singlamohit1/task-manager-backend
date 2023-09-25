const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const taskMetricsRoutes = require('./routes/taskMetricsRoutes');

app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  };

  app.use(cors(corsOptions));

app.use('/api', taskRoutes);
app.use('/api', taskMetricsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}!`);
});
