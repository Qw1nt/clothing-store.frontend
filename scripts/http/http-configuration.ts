export const domain: string = "https://localhost:7261"

export function getImage(url?: string){
    return `https://localhost:7261/api/${url}`;
}