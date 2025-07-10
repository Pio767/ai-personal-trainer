import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Personal Trainer Backend is running! 🧬',
    timestamp: new Date().toISOString() 
  });
});

// AI Chat endpoint for testing
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    console.log(`Message from ${userId}: ${message}`);
    
    // Basic AI response
    const response = generateAIResponse(message);
    
    res.json({ 
      response,
      timestamp: new Date().toISOString(),
      userId 
    });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Basic AI response function
function generateAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('cześć') || lowerMessage.includes('hej')) {
    return "Cześć! 👋 Jestem Twoim AI Personal Trainer opartym na holistycznej filozofii treningu. 🧬\n\nCiało i umysł to jeden system adaptacyjny. Zanim zacznę tworzyć Twój plan, muszę poznać Twój organizm.\n\nJak się dziś czujesz? Jaki jest Twój poziom energii w skali 1-10? ⚡";
  }
  
  if (lowerMessage.includes('trening') || lowerMessage.includes('ćwicz')) {
    return "Świetnie, że chcesz trenować! 💪\n\nAle najpierw - jak oceniasz swój:\n• Poziom stresu (1-10)\n• Jakość snu (1-10)\n• Poziom energii (1-10)\n\nTo nie są zwykłe pytania fitness - to holistic assessment Twojego systemu nerwowego. 🧠";
  }
  
  return "Rozumiem! 🧬 Jako Twój AI Personal Trainer, podchodzę holistycznie do treningu.\n\nCiało i umysł to jeden system adaptacyjny. Powiedz mi więcej o tym, jak się czujesz - to pomoże mi lepiej Ci doradzić. 💪";
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Personal Trainer Backend started!`);
  console.log(`🌟 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});
