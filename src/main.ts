import { IWebhookConfig, NestGram } from 'nestgram';
import { config } from 'dotenv';
config();

import { AppModule } from './app/app.module';
import * as process from 'process';

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
async function bootstrap(): Promise<void> {
    let bot: NestGram;

    bot = new NestGram(process.env.BOT_TOKEN, AppModule);
    // bot.webhook.api.getWebhookInfo();
    if (process.env.NODE_ENV === 'production') {
        const webhookUrl = process.env.WEBHOOK_URL;
        if (!webhookUrl) throw new Error('WEBHOOK_URL is not defined');
        const webHookInfo = await bot.webhook.api.getWebhookInfo();
        if (webHookInfo.url !== webhookUrl) {
            await bot.webhook.api.deleteWebhook();
            await bot.webhook.api.setWebhook(<IWebhookConfig>{
                url: webhookUrl,
                port: PORT,
            });
        }
    }
    await bot.start();
}

bootstrap();
