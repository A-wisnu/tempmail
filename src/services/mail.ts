import Mailjs from '@cemalgnlts/mailjs';

interface Account {
  address: string;
  token: string;
}

interface ApiMessage {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject?: string;
  text?: string;
  html?: string | string[];
  createdAt: string;
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
        console.log('Mencoba membuat akun baru...');
        const response = await this.mailjs.createOneAccount();
        
        console.log('Respon dari createOneAccount:', response);
        
        if (!response) {
          throw new Error('Tidak ada respon dari server');
        }

        if (!response.status) {
          throw new Error(`Status error: ${JSON.stringify(response)}`);
        }

        if (!response.data) {
          throw new Error(`Tidak ada data dalam respon: ${JSON.stringify(response)}`);
        }

        const { username, password } = response.data;
        
        console.log('Mencoba login dengan akun baru...');
        const loginResponse = await this.mailjs.login(username, password);
        
        console.log('Respon dari login:', loginResponse);

        if (!loginResponse) {
          throw new Error('Tidak ada respon dari server saat login');
        }

        if (!loginResponse.status) {
          throw new Error(`Status login error: ${JSON.stringify(loginResponse)}`);
        }

        if (!loginResponse.data || !loginResponse.data.token) {
          throw new Error(`Token tidak ditemukan dalam respon login: ${JSON.stringify(loginResponse)}`);
        }

        this.token = loginResponse.data.token;

        return {
          address: username,
          token: this.token,
        };
      }, 5, 2000); // Meningkatkan jumlah retry dan delay
    } catch (error) {
      console.error('Error detail saat membuat akun:', error);
      if (error instanceof Error) {
        throw new Error(`Gagal membuat akun email sementara: ${error.message}`);
      }
      throw new Error('Gagal membuat akun email sementara karena kesalahan yang tidak diketahui');
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

      return response.data.map((msg: ApiMessage) => ({
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