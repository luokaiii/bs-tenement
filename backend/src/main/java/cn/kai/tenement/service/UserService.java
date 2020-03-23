package cn.kai.tenement.service;

import cn.kai.tenement.model.User;
import cn.kai.tenement.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

/**
 * @description: 用户服务
 * @create: 2020-03-04
 */
@Service
public class UserService extends BaseService<User, Integer> {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public JpaRepository<User, Integer> getRepository() {
        return userRepository;
    }

    public User findFirstByUsername(String username) {
        return userRepository.findFirstByUsername(username);
    }

    public User create(User user) {
        user.setId(null);
        user.setDisabled(false);
        user.setCreateDate(LocalDate.now());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> updateByPhone(String username, String phone, String password) {
        User user = userRepository.findFirstByPhoneAndUsername(phone, username);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
        }
        return Optional.ofNullable(user);
    }
}
