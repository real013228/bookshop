const firebaseConfig = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  // privateKey: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
  privateKey: process.env.PRIVATE_KEY,
};

export default firebaseConfig;
