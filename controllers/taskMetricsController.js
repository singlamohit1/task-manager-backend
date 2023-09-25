const { Task, sequelize } = require('../models');

exports.getTaskMetrics = async (req, res) => {
  try {
    const taskMetrics = await Task.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('status')), 'count'],
        'status',
      ],
      group: ['status'],
    });

    const taskMetricsByMonth = await Task.findAll({
      attributes: [
        [
          sequelize.fn(
            'to_char',
            sequelize.col('dueDate'),
            'Month YYYY'
          ),
          'date',
        ],
        [sequelize.fn('COUNT', sequelize.col('status')), 'count'],
        'status',
      ],
      group: ['date', 'status'],
      order: [['date', 'ASC']],
    });

    const metricsData = {
      open_tasks: 0,
      inprogress_tasks: 0,
      completed_tasks: 0,
      metrics: [],
    };

    for (const metric of taskMetrics) {
      switch (metric.status) {
        case 'open':
          metricsData.open_tasks = metric.dataValues.count;
          break;
        case 'inprogress':
          metricsData.inprogress_tasks = metric.dataValues.count;
          break;
        case 'completed':
          metricsData.completed_tasks = metric.dataValues.count;
          break;
      }
    }

    for (const metric of taskMetricsByMonth) {
      const date = metric.dataValues.date;
      const status = metric.dataValues.status;
      const count = metric.dataValues.count;

      const monthMetrics = metricsData.metrics.find((m) => m.date === date);
      if (!monthMetrics) {
        metricsData.metrics.push({ date, metrics: {} });
      }

      metricsData.metrics.forEach((m) => {
        if (m.date === date) {
          m.metrics[status] = count;
        }
      });
    }

    res.status(200).json(metricsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve task metrics' });
  }
};
