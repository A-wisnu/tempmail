import Mailjs from '@cemalgnlts/mailjs';

interface Account {
  address: string;
  token: string;
}

class MailService {
  private mailjs: any;
  private token: string | null = null;

  constructor() {
    this.mailjs = new Mailjs();
  }

  async createAccount(): Promise<Account> {
    try {
      const response = await this.mailjs.createOneAccount();
      
      if (!response.status) {
        throw new Error(response.message);
      }

      const loginResponse = await this.mailjs.login(
        response.data.username,
        response.data.password
      );

      if (!loginResponse.status) {
        throw new Error(loginResponse.message);
      }

      const token = this.mailjs.token;
      this.token = token;

      return {
        address: response.data.username,
        token: token,
      };
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async getMessages() {
    if (!this.token) {
      throw new Error('No token available. Please create an account first.');
    }

    try {
      const response = await this.mailjs.getMessages();
      
      if (!response.status) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }

  async getMessage(messageId: string) {
    if (!this.token) {
      throw new Error('No token available. Please create an account first.');
    }

    try {
      const response = await this.mailjs.getMessage(messageId);
      
      if (!response.status) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error('Error getting message:', error);
      throw error;
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