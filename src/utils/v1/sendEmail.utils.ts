import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailUtil {
  constructor(private readonly messageService: MailerService) {}

  async sendMail(message: string, to: string, subject?: string): Promise<void> {
    await this.messageService.sendMail({
      from: 'Wool <ehsanulsakib.professional@gmail.com>',
      to,
      subject: subject || 'Email Confirmation!',
      text: message,
    });
  }
}