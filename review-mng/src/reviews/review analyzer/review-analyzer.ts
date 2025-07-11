import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class SentimentAnalyzerService {

  constructor(private configService : ConfigService){}
  async analyzeSentiment(text: string) {
    try {
      console.log(text);
      const keyName = process.env.GOOGLEAPIKEY;
      console.log("key name " ,keyName);
if (!keyName) {
  throw new Error('GOOGLEAPIKEY environment variable is not defined');
}

 
   console.log("in analyzer  " , process.env.GOOGLEAPIKEY)
   
      
   
      // if (!apiKey) {
      //   throw new Error('GOOGLE_API_KEY is not defined in the environment variables');
      // }

      const genAI = new GoogleGenerativeAI(keyName);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `
    You are a review sentiment analyzer. Based on the text below, classify it as either "Good" or "Bad".

    Review: "${text}"
 
    Respond with only one word: Good or Bad.
  `;

      const result = await model.generateContent(prompt);
      console.log(result);
      const response = (await result.response.text()).trim();
      console.log(response);

      return response === 'Good' ? 'Good' : 'Bad';
    } catch (error) {
      console.log('Failed to fetch review statistics with sentiment', error);
      throw new InternalServerErrorException({
        message: 'Failed to fetch review statistics with sentiment',
        reason: error.message,
      });
    }
  }
}
  