import app from './app.js';
import { envConfig } from './config/envConfig.js';
import { sequelize } from './config/database.js'

//import models
import './models/user.model.js'
import './models/characters.model.js'
import './models/movies.model.js'
import './models/genre.model.js'
import './models/references.js'

async function main(){
    try {
        await sequelize.sync({ alter: true })
        
        app.listen(envConfig.app.port)
        console.log('Server running')
    } catch (error) {
        console.error(error)
    }
}
main()