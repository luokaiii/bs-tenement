package cn.kai.tenement.service;

import cn.kai.tenement.model.MyUserDetails;
import cn.kai.tenement.model.OperateLog;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @description: 登录处理器
 * @create: 2020-03-04
 * @author: luokaiii
 */
@Component
public class MyAuthenticationHandler implements AuthenticationSuccessHandler, AuthenticationFailureHandler {

    private final ObjectMapper objectMapper;

    private final OperateLogService operateLogService;

    public MyAuthenticationHandler(ObjectMapper objectMapper,
                                   OperateLogService operateLogService) {
        this.objectMapper = objectMapper;
        this.operateLogService = operateLogService;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        PrintWriter writer = response.getWriter();
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(400);
        writer.print(exception.getMessage());
        writer.flush();
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        Object principal = authentication.getPrincipal();
        if (principal instanceof MyUserDetails) {
            final OperateLog log = OperateLog.build(((MyUserDetails) principal).getId(), ((MyUserDetails) principal).getNickname(), "登录系统", request);
            operateLogService.save(log);
        }
        PrintWriter writer = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        writer.print(objectMapper.writeValueAsString(principal));
        writer.flush();
    }

}
