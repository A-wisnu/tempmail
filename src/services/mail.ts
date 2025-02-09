import Mailjs from '@cemalgnlts/mailjs';

interface Account {
  address: string;
  token: string;
}

interface MailMessage {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  text: string;
  html: string;
  createdAt: string;
}

class MailService {
  private mailjs: Mailjs;
  private token: string | null = null;

  constructor() {
    this.mailjs = new Mailjs();
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await this.delay(delayMs * (i + 1)); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }

  async createAccount(): Promise<Account> {
    try {
      return await this.retryOperation(async () => {
        const response = await this.mailjs.createOneAccount();
        
        if (!response || !response.status || !response.data) {
          throw new Error('Failed to create account');
        }

        const { username, password } = response.data;
        
        const loginResponse = await this.mailjs.login(username, password);

        if (!loginResponse || !loginResponse.status || !loginResponse.data || !loginResponse.data.token) {
          throw new Error('Failed to login');
        }

        this.token = loginResponse.data.token;

        return {
          address: username,
          token: this.token,
        };
      });
    } catch (error) {
      console.error('Error creating account:', error);
      throw new Error('Gagal membuat akun email sementara. Silakan coba lagi nanti.');
    }
  }

  async getMessages(): Promise<MailMessage[]> {
    if (!this.token) {
      throw new Error('No token available. Please create an account first.');
    }

    try {
      const response = await this.mailjs.getMessages();
      
      if (!response || !response.status || !response.data) {
        throw new Error('Failed to get messages');
      }

      return response.data.map((msg: any) => ({
        id: msg.id,
        from: {
          address: msg.from.address,
          name: msg.from.name
        },
        subject: msg.subject || '',
        text: '',
        html: '',
        createdAt: msg.createdAt
      }));
    } catch (error) {
      console.error('Error getting messages:', error);
      throw new Error('Gagal mengambil pesan. Silakan coba lagi.');
    }
  }

  async getMessage(messageId: string): Promise<MailMessage> {
    if (!this.token) {
      throw new Error('No token available. Please create an account first.');
    }

    try {
      const response = await this.mailjs.getMessage(messageId);
      
      if (!response || !response.status || !response.data) {
        throw new Error('Failed to get message');
      }

      const msg = response.data;
      return {
        id: msg.id,
        from: {
          address: msg.from.address,
          name: msg.from.name
        },
        subject: msg.subject || '',
        text: msg.text || '',
        html: Array.isArray(msg.html) ? msg.html.join('') : (msg.html || ''),
        createdAt: msg.createdAt
      };
    } catch (error) {
      console.error('Error getting message:', error);
      throw new Error('Gagal mengambil detail pesan. Silakan coba lagi.');
    }
  }

  setupEventListeners(onNewMessage: () => void) {
    this.mailjs.on('arrive', () => {
      onNewMessage();
    });

    return () => {
      this.mailjs.off();
    };
  }
}

export const mailService = new MailService(); 