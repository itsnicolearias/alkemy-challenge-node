import app from './app.js';
import { enviromentConfig } from './config/environmentConfig.js'
import { sequelize } from './config/database.js'

import './models/characters.js'
import './models/movies.js'
import './models/genre.js'

async function main(){
    try {
        await sequelize.sync()
        
        app.listen(enviromentConfig.app.port)
        console.log('Server running')
    } catch (error) {
        console.error(error)
    }
}
main()