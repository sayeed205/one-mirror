import { NestGram } from 'nestgram';
import { config } from 'dotenv';
config();

import { AppModule } from './app/app.module';
import * as process from 'process';

async function bootstrap(): Promise<void> {
    const bot: NestGram = new NestGram(process.env.BOT_TOKEN, AppModule);
    await bot.start();
}

bootstrap();
