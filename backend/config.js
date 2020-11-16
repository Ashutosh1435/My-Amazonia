import dotenv from 'dotenv'


dotenv.config();

export default {
    port: process.env.local.PORT,
    accessKeyId: process.env.local.AWS_ACCESS_KEY_ID || 'accessKeyId',
    secretAccessKey: process.env.local.AWS_SECRET_ACCESS_KEY || 'secretAccessKey',
    sharpPath: process.env.local.AWS_SHARP_PATH || 'sharpPath',

    instamojoSandboxKey: process.env.local.INSTAMOJO_SANDBO_KEY || 'instamojoSandboxKey',
    instamojoSandboxToken: process.env.local.INSTAMOJO_SANDBOX_TOKEN || 'instamojoSandboxKey',
}
