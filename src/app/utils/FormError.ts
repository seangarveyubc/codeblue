export class FormError {
    field: string;
    message: string;

    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }
}
