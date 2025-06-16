import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class NotAllowedExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()

        if (status === 404)
            return response.status(HttpStatus.METHOD_NOT_ALLOWED).json({
                message: exception.message,
                error: 'MethodNotAllowed',
                statusCode: HttpStatus.METHOD_NOT_ALLOWED
            })

        return response.status(status).json({
            message: exception.message,
            error: exception.name,
            statusCode: status
        })
    }
}
