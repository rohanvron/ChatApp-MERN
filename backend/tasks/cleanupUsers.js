// to delete unverified users after 15 minutes
import cron from 'node-cron';
import User from '../models/user.model.js';

const cleanupUnverifiedUsers = async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  const result = await User.deleteMany({
    isVerified: false,
    createdAt: { $lt: fifteenMinutesAgo }
  });
  console.log(`Cleaned up ${result.deletedCount} unverified users`);
};

export const startCleanupTask = () => {
  cron.schedule('*/15 * * * *', cleanupUnverifiedUsers);
};

