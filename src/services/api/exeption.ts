export default function(error: any) {
    let e;
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.errors) e = error.response.data.errors;
            else if (error.response.data.message) e = error.response.data.message;
        }
    } else e = error;
    console.error(e);
}
