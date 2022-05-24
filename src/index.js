import app from './app.js';
import { enviromentConfig } from './config/environmentConfig.js'
import { sequelize } from './config/database.js'

import './models/characters.model.js'
import './models/movies.model.js'
import './models/genre.model.js'
import './models/references.js'

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