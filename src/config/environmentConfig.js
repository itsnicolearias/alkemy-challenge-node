import dotenv from 'dotenv'
dotenv.config();

const { 
    APP_PORT,
    DB_USER,
    DB_PASSWORD,
    SECRET_TOKEN
} = process.env;

export const enviromentConfig = {
    app: {
        port: APP_PORT,
        
    },
    db: {
        user: DB_USER,
        password: DB_PASSWORD
    },
    jwt: {
        secret: SECRET_TOKEN
    }
}