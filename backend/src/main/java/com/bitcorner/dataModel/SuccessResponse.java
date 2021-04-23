package com.bitcorner.dataModel;

/**
 * Success response object
 */
public class SuccessResponse {
    private String successMessage;

    /**
     * Constructor for Success response
     * @param successMessage message to be displayed
     */
    public SuccessResponse(String successMessage){
        this.successMessage=successMessage;
    }

    /**
     * Getter for success message
     * @return get message
     */

    public String getSuccessMessage() {
        return successMessage;
    }

    /**
     * Setter for success message
     * @param successMessage
     */
    public void setSuccessMessage(String successMessage) {
        this.successMessage = successMessage;
    }
}
