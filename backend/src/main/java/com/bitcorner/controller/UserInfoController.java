package com.bitcorner.controller;

import com.bitcorner.dataModel.ErrorResponse;
import com.bitcorner.entity.UserInfo;
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

/**
 * Controller for the User APIs
 */
@RestController
@RequestMapping("/user")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    private HttpServletRequest request;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getUserInfo()
    {
        try {
            String userId=getUserId();
            if(userId==null && userId.isEmpty()){
                throw new BadAttributeValueExpException("Invalid UserId");
            }
            UserInfo userInfo=userInfoService.getById(userId);

            UserInfo userInfo1=userInfoService.getByNickName(userInfo.getNickName());
            System.out.println("userInfo1");
            System.out.println(userInfo1);

            UserInfo userInfo2=userInfoService.getByUserName(userInfo.getUserName());
            System.out.println("userInfo2");
            System.out.println(userInfo2);

            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (BadAttributeValueExpException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
        }catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(method = RequestMethod.PUT, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> saveUserInfo(@RequestParam(name = "nickname", required = true) String nickName,@RequestParam(name = "username", required = false) String userName)
    {
        try {
            String userId=getUserId();
            boolean userExists=userInfoService.isUserInfoAvailable(userId);
            UserInfo userInfo=null;
            if(userExists){
                userInfo=userInfoService.getById(userId);
                userInfo.setNickName(nickName);
                userInfoService.create(userInfo);
            }else{
                userInfo=new UserInfo(userId, userName, nickName);
                userInfoService.update(userInfo);
            }
            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (BadAttributeValueExpException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.toString()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "search",method = RequestMethod.GET, produces =  MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> searchUserByNickName(@RequestParam(name = "query", required = true) String nickName)
    {
        try {
            List<UserInfo> userInfoList=userInfoService.searchUsersByNickName(nickName);
            return new ResponseEntity<>(userInfoList, HttpStatus.OK);
        }
        catch (EntityNotFoundException ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception ex){
            return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getUserId(){
        return request.getHeader("userId");
    }
}
