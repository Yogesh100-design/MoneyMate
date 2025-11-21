class ApiResponce {
    // Standard Order: statusCode, DATA, message
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;       // Assign data to data
        this.message = message; // Assign message to message
        this.success = statusCode < 400;
    }
}

export default ApiResponce;
