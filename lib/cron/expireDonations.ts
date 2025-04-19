import dbConnect from '@/DB/connection';
import donationService from '@/module/services/donation.service';
import cron from 'node-cron';

export function startExpirationCron() {
  cron.schedule('*/10 * * * * *', async () => {
    try {
      await dbConnect();
      const expiredCount = await donationService.expireDonations();
      if (expiredCount > 0) {
        console.log(`Updated ${expiredCount} expired donations`);
      }
    } catch (error) {
      console.error('Error in expiration cron:', error);
    }
  });
}