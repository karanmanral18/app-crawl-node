import { Global, Module } from '@nestjs/common';
import { EventRegisterCallbackService } from './event-register-callback/event-register-callback.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
    }),
  ],
  providers: [EventRegisterCallbackService],
  exports: [EventRegisterCallbackService],
})
export class CommonModule {}
