package com.bitcorner.controller;

import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.entity.Message;
import com.bitcorner.entity.UserInfo;
import com.bitcorner.service.MessageService;
import com.bitcorner.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.BadAttributeValueExpException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    private HttpServletRequest request;


    @RequestMapping(value = "{toNickName}",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> sendMessage(@PathVariable("toNickName") String toNickName){
        try {
            String fromUserId=getUserId();
            UserInfo fromUser=userInfoService.getById(fromUserId);
            UserInfo toUser=userInfoService.getByNickName(toNickName);
            if(fromUser.getId().equals(toUser.getId())){
                throw new BadAttributeValueExpException("Cannot send message to yourself");
            }
            // TODO remove message and take it from body param
            String messageText="Some message";
            Message message=new Message(fromUserId,toUser.getId(),messageText);
            message.setToUser(toUser);
            message.setFromUser(fromUser);
            messageService.save(message);
            return new ResponseEntity<>(message,HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (BadAttributeValueExpException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "{toNickName}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getMessageThread(@PathVariable("toNickName") String toNickName){
        try {
            String fromUserId=getUserId();
            UserInfo fromUser=userInfoService.getById(fromUserId);
            UserInfo toUser=userInfoService.getByNickName(toNickName);

            List<Message> messageList=messageService.getMessageThread(fromUserId,toUser.getId());
            return new ResponseEntity<>(messageList,HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "connections",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getConnectedUsers(){
        try {
            String userId=getUserId();

            List<String> connections=messageService.getConnectedUsers(userId);
            return new ResponseEntity<>(connections,HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getUserId(){
        return request.getHeader("userId");
    }

}
