import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        let ctx = host.switchToHttp();

        let response = ctx.getResponse();
        let request = ctx.getRequest();

        let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = exception instanceof HttpException ? exception.message : "Internal server error";
        if (message === 'Internal server error' && exception instanceof Error) {
            console.log(message)
            console.log(exception.stack)
        }

        response.status(status).json({
            statusCode: status,
            message,
            data: {
                path: request.url,
                time: new Date().toISOString()
            }
        })
    }
}
