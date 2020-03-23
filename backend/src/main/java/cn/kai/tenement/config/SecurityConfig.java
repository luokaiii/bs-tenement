package cn.kai.tenement.config;

import cn.kai.tenement.service.LoginUserService;
import cn.kai.tenement.service.MyAuthenticationHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

/**
 * @description: 安全配置
 * @create: 2020-03-04
 * @author: luokaiii
 */
@Configuration
@EnableGlobalMethodSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final LoginUserService loginUserService;

    private final MyAuthenticationHandler authenticationHandler;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(LoginUserService loginUserService,
                          MyAuthenticationHandler authenticationHandler, PasswordEncoder passwordEncoder) {
        this.loginUserService = loginUserService;
        this.authenticationHandler = authenticationHandler;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/registry", "/user/reset").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .successHandler(authenticationHandler).failureHandler(authenticationHandler)
                .permitAll()
                .and().logout().logoutSuccessUrl("/")
                .and().rememberMe().rememberMeParameter("remember-me")
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(loginUserService)
                .passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/console/**");
    }


}
