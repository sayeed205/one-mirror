import * as config from 'config';
import { NestGram } from 'nestgram';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
    const bot: NestGram = new NestGram(
        config.get<string>('BOT_TOKEN'),
        AppModule,
    );
    await bot.start();
}

bootstrap();
