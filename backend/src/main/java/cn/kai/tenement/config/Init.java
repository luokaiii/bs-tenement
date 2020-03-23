package cn.kai.tenement.config;

import cn.kai.tenement.model.User;
import cn.kai.tenement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @description: 初始化项目
 * @create: 2020-03-04
 * @author: luokaiii
 */
@Component
public class Init implements CommandLineRunner {

    private final UserService userService;

    @Autowired
    public Init(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        final User first = userService.findFirstByUsername("zzh2020");
        if (first == null) {
            final User user = new User();
            user.setAvatar("https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/1.jpg");
            user.setUsername("zzh2020");
            user.setPassword("123456");
            user.setNickname("超级管理员zzh");
            user.setRole(User.Role.SUPER_ADMIN);
            user.setPhone("18812345678");
            userService.create(user);
        }
    }
}
