type TRole = 'USER' | 'ADMIN'

export interface IUser {
    uid: number,
    username: string,
    email: string,
    password: string,
    role: TRole
}

export interface IMovie {
    id: number,
    name: string,
    release_date: Date,
    genre: string,
    status: string,
    total_seat: number,
    seat_available: number,
    time: Date[],
    price: number
}

export interface ITransaction {
    movies_id: number,
    users_uid: number,
    date: Date,
    time: Date,
    total_seat: number
}

export interface IError extends Error {
    status: number
}