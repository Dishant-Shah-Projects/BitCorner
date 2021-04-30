package com.bitcorner.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.hibernate.annotations.Target;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Aspect
public class AuthenticationAspect {

    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    public @interface Authenticate{

    }

    @Before("@annotation(Authenticate)")
    private void authenticate(JoinPoint joinPoint){
        System.out.println("Hit");
    }
}
