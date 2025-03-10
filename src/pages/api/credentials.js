// backend/src/pages/api/credentials.js
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, username, password } = req.body;
    const encryptedPassword = encrypt(password);
    // Salvar credencial no banco de dados
    res.status(200).json({ name, username, encryptedPassword });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', 'encryption_key');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}