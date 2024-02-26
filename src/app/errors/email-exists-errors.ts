export class EmailAlreadyExistsError implements Error {
    name: string = "Email exists error";
    message: string = "Email already existing";
    stack?: string;
}