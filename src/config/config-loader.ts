export const configLoader = () => {
    return {
        port: parseInt(process.env.PORT,10) || 3000,
        jwtConstants: {
            secret: process.env.SECRET_TOKEN_JWT,
            expiresIn:'1h'
        }
    }
}