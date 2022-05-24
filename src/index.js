import app from './app.js';
import { enviromentConfig } from './config/environmentConfig.js'
import { sequelize } from './config/database.js'



async function main(){
    try {
        await sequelize.sync({ force: true})
        
        app.listen(enviromentConfig.app.port)
        console.log('Server running')
    } catch (error) {
        console.error(error)
    }
}
main()