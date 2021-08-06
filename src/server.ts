import 'module-alias/register'
import { app } from '@/app'

// Start rest
app.listen(1337).on('listening', () => {
  console.log('HTTP is listening on 1337')
})
