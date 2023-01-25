// Verifies that birthday is a valid date entered in DD/MM/YYYY format
// Returns true if birthday date is valid, false otherwise
export const isBirthdayValid = (birthday: string): boolean => {
    const regex =
        /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
    return regex.test(birthday);
};

// Verifies that input number is a string that represets a valid, positive number,
// up to 5 decimal places are allowed. Returns true if num is a positive number, false otherwise
export const isPositiveNum = (num: string): boolean => {
    const regex = /^\d+(\.\d{1,5})?$/;
    return regex.test(num);
};
