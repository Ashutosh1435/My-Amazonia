import dotenv from 'dotenv'


dotenv.config();
// dotenv.local.config();
export default {
    port: process.env.PORT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'accessKeyId',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'secretAccessKey',
    sharpPath: process.env.AWS_SHARP_PATH || 'sharpPath',

    instamojoSandboxKey: process.env.INSTAMOJO_SANDBO_KEY || 'instamojoSandboxKey',
    instamojoSandboxToken: process.env.INSTAMOJO_SANDBOX_TOKEN || 'instamojoSandboxKey',
}
