package cn.kai.tenement.repo;

import cn.kai.tenement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findFirstByUsername(String username);

    User findFirstByPhoneAndUsername(String phone, String username);

}
