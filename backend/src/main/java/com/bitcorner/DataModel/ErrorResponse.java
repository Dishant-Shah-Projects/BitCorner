package com.bitcorner.DataModel;
/**
 * error response object
 */
public class ErrorResponse {
    private String errorMessage;
    /**
     * Constructor for error response
     * @param errorMessage message to be displayed
     */

    public ErrorResponse(String errorMessage){
        this.errorMessage=errorMessage;
    }
    /**
     * Getter for error message
     * @return error message message
     */
    public String getErrorMessage() {
        return errorMessage;
    }
    /**
     * Setter for error message
     * @param errorMessage
     */
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
