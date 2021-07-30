import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
		origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
		credentials: true
  })
)

export default cors