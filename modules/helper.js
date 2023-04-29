module.exports.getJwtToken = (cookie) => {
    let jwt_token;
    cookie.split("; ").forEach((element) => {
        if (element.includes("jwt_token=")) {
            jwt_token = element.substring(11, element.length - 1).split(" ")[1];
        }
    });
    return jwt_token;
};
