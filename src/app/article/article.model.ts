export interface IArticle {
    title: string,
    body: string,
    intro: string,
    tags: Array<string>,
    image: Image,
    images: Image[],
}

export interface Image {
    alt: string,
    large: string,
    medium: string,
    small: string,
    title: string,
}