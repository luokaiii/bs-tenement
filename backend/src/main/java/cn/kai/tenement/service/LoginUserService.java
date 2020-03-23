package cn.kai.tenement.service;

import cn.kai.tenement.model.MyUserDetails;
import cn.kai.tenement.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @description: 登录服务
 * @create: 2020-03-04
 * @author: luokaiii
 */
@Service
public class LoginUserService implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public LoginUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userService.findFirstByUsername(username);

        if (null == user) {
            throw new UsernameNotFoundException("user not found.");
        }

        final MyUserDetails details = new MyUserDetails();
        BeanUtils.copyProperties(user, details);
        return details;
    }
}
