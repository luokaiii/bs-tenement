package cn.kai.tenement.controller;

import cn.kai.tenement.model.MyUserDetails;
import cn.kai.tenement.model.User;
import cn.kai.tenement.service.BaseService;
import cn.kai.tenement.service.OperateLogService;
import cn.kai.tenement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CONFLICT;

/**
 * @description: 用户接口
 * @create: 2020-03-04
 * @author: luokaiii
 */
@RestController
@RequestMapping("/user")
public class UserController extends BaseController<User, Integer> {

    private final UserService userService;

    private final OperateLogService operateLogService;

    @Autowired
    public UserController(UserService userService, OperateLogService operateLogService) {
        this.userService = userService;
        this.operateLogService = operateLogService;
    }

    @Override
    public BaseService<User, Integer> getService() {
        return userService;
    }

    @GetMapping("/ping")
    public ResponseEntity<User> ping(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof MyUserDetails) {
            return ResponseEntity.ok((MyUserDetails) principal);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/registry")
    public ResponseEntity<User> registry(@RequestBody User user) {
        final User first = userService.findFirstByUsername(user.getUsername());
        if (first != null) {
            return ResponseEntity.status(CONFLICT).build();
        }
        return ResponseEntity.ok(userService.create(user));
    }

    @PutMapping("/{id}/disabled")
    public ResponseEntity disabled(HttpServletRequest request,
                                   Authentication authentication,
                                   @PathVariable Integer id,
                                   @RequestParam("disabled") Boolean disabled) {
        final Optional<User> optional = userService.findById(id);
        optional.ifPresent(user -> {
            user.setDisabled(disabled);
            final String format = String.format("更改用户[%s]的状态为[%s]", user.getNickname(), disabled);
            operateLogService.saveLog(request, authentication, format);
            userService.save(user);
        });
        return optional.map(v -> ResponseEntity.noContent().build())
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/reset")
    public ResponseEntity<User> updatePassword(@RequestParam("username") String username,
                                               @RequestParam("phone") String phone,
                                               @RequestParam("password") String password) {
        Optional<User> user = userService.updateByPhone(username, phone, password);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
