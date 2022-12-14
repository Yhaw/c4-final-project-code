import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

//import { createTodo } from '../../businessLogic/todos'
//import {createTodo } from '../../helpers/todosAcess'
//import { todoBuilder } from '../../helpers/todos'
import { getUserId } from '../utils'
import { createTodoItem } from '../../businessLogic/todos'
 
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event)
    const requestBody: CreateTodoRequest = JSON.parse(event.body)
    
    
    

    if (requestBody.name == "") {
      console.log("Enter a correct name")
      throw {
          status: 404,
          error: new Error("Enter a correct name")    

      }
  }
  else{
    
    const item = await createTodoItem(requestBody, userId)
    delete item['userId']
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item
      })
    }}}
  
)

handler.use(
  cors({
    credentials: true
  })
)
