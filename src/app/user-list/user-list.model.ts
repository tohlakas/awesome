export interface IUserList {
    list: IUser[],
}

export interface IUser {
    author: string,
    body: string,
    boolean: boolean,
    date: number,
    email: string,
    firstname: string,
    id: string,
    surname: string,
    phone: string,
    intro: string,
    personal_code: string,
    tags: Array<string>,
    title: string,
    sex: string,
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

